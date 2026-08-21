create table if not exists public.domains (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  domain_name text not null,
  expiry_date date,
  last_checked_at timestamptz,
  registrar text,
  status text not null default 'check_failed' check (status in ('active', 'expiring_soon', 'expired', 'check_failed')),
  created_at timestamptz not null default now(),
  unique (user_id, domain_name)
);

create index if not exists domains_user_id_idx on public.domains(user_id);

alter table public.domains enable row level security;

create policy "Users can view their own domains"
  on public.domains for select
  using (auth.uid() = user_id);

create policy "Users can add their own domains"
  on public.domains for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own domains"
  on public.domains for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own domains"
  on public.domains for delete
  using (auth.uid() = user_id);

create or replace function public.enforce_domain_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (select count(*) from public.domains where user_id = new.user_id) >= 1000 then
    raise exception 'DOMAIN_LIMIT_REACHED';
  end if;
  return new;
end;
$$;

drop trigger if exists domains_limit_before_insert on public.domains;
create trigger domains_limit_before_insert
  before insert on public.domains
  for each row execute function public.enforce_domain_limit();