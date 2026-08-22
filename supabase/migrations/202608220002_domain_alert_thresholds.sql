alter table public.domains
  add column if not exists alert_thresholds integer[];
