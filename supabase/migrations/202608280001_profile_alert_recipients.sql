-- Account-wide default alert recipients, mirroring domains.alert_recipients. When a domain has
-- no custom recipient list, the cron job falls back to this before the owner's own email.
alter table public.profiles
  add column if not exists alert_recipients text[];
