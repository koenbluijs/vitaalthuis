-- Draai DIT los bij in de Supabase SQL Editor (je had de rest al gedraaid).
-- Dit is de tabel die de app-sync daadwerkelijk gebruikt: één JSON-snapshot per
-- gebruiker, met werkende Row Level Security.

create table if not exists app_state (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  state      jsonb not null,
  updated_at timestamptz not null default now()
);

alter table app_state enable row level security;

drop policy if exists "app_state self select" on app_state;
drop policy if exists "app_state self insert" on app_state;
drop policy if exists "app_state self update" on app_state;

create policy "app_state self select" on app_state
  for select using (auth.uid() = user_id);
create policy "app_state self insert" on app_state
  for insert with check (auth.uid() = user_id);
create policy "app_state self update" on app_state
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
