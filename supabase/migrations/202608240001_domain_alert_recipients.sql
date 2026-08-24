alter table public.domains
  add column if not exists alert_recipients text[];
