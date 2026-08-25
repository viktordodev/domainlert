-- Lets the cron job record that a domain isn't registered at all (distinct from "check_failed",
-- which means the lookup itself broke). The cron job excludes this status from its sweep so
-- unregistered domains stop being rechecked every run.
alter table public.domains
  drop constraint if exists domains_status_check;

alter table public.domains
  add constraint domains_status_check
  check (status in ('active', 'expiring_soon', 'expired', 'check_failed', 'not_registered'));
