-- Draai DIT los bij in de Supabase SQL Editor voor lichte, privacyvriendelijke analytics.
-- We loggen alleen anonieme gebeurtenissen (geen persoonsgegevens), gekoppeld aan de
-- (anonieme) gebruiker. Gebruikers kunnen alleen hun eigen events schrijven; lezen doe
-- je als beheerder via het dashboard / de service role.

create table if not exists events (
  id         bigserial primary key,
  user_id    uuid references auth.users (id) on delete cascade,
  event      text not null,
  props      jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists events_event_idx on events (event);
create index if not exists events_created_idx on events (created_at);

alter table events enable row level security;

drop policy if exists "events self insert" on events;
create policy "events self insert" on events
  for insert with check (auth.uid() = user_id);
