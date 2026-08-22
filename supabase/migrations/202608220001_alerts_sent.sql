create table if not exists public.alerts_sent (
  id uuid primary key default gen_random_uuid(),
  domain_id uuid not null references public.domains(id) on delete cascade,
  threshold integer not null,
  sent_at timestamptz not null default now(),
  unique (domain_id, threshold)
);

create index if not exists alerts_sent_domain_id_idx on public.alerts_sent(domain_id);

alter table public.alerts_sent enable row level security;

create policy "Users can view alerts for their own domains"
  on public.alerts_sent for select
  using (
    exists (
      select 1 from public.domains
      where public.domains.id = alerts_sent.domain_id
        and public.domains.user_id = auth.uid()
    )
  );
