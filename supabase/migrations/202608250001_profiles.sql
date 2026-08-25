-- Profile fields and default alert thresholds, previously stored in auth.users' metadata.
-- A real table (instead of auth metadata) makes this data joinable in normal SQL — e.g. the
-- daily cron job can select every domain owner's default thresholds in one query instead of
-- one Admin API call per distinct user.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  job_title text,
  agency_name text,
  phone text,
  website text,
  alert_thresholds integer[],
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can create their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create or replace function public.set_profiles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_profiles_updated_at();

-- Auto-create a profile row for every new signup, so app code can always assume one exists.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill profiles for users that already exist, carrying over whatever they had stored
-- in user_metadata so nobody's saved name/thresholds/etc. disappear.
insert into public.profiles (id, full_name, job_title, agency_name, phone, website, alert_thresholds)
select
  u.id,
  nullif(u.raw_user_meta_data->>'full_name', ''),
  nullif(u.raw_user_meta_data->>'job_title', ''),
  nullif(u.raw_user_meta_data->>'agency_name', ''),
  nullif(u.raw_user_meta_data->>'phone', ''),
  nullif(u.raw_user_meta_data->>'website', ''),
  case
    when jsonb_typeof(u.raw_user_meta_data->'alert_thresholds') = 'array'
      then (select array_agg((elem)::integer) from jsonb_array_elements_text(u.raw_user_meta_data->'alert_thresholds') as elem)
    else null
  end
from auth.users u
on conflict (id) do nothing;

-- Give the domain-cap exception a stable, distinguishable SQLSTATE instead of relying on
-- app code to string-match the raised message (fragile if the message text ever changes).
-- Supabase/PostgREST surface this as `error.code` in the client.
create or replace function public.enforce_domain_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (select count(*) from public.domains where user_id = new.user_id) >= 1000 then
    raise exception 'Domain limit reached' using errcode = 'DL001';
  end if;
  return new;
end;
$$;
