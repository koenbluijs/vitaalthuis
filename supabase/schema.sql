-- Vitaal Thuis — Supabase/Postgres schema (Fase 5)
-- De MVP draait LOCAL-FIRST (data in de browser, zie lib/store.ts). Dit schema is
-- de "Supabase-ready" tegenhanger: dezelfde domeinstructuur, zodat sync/login later
-- 1-op-1 toegevoegd kan worden zonder het datamodel te herzien.
-- NIET-medisch: geen diagnose-/behandelvelden.

-- ── Profiel (1 per ingelogde gebruiker) ────────────────────────────────────
create table if not exists profiles (
  id            uuid primary key references auth.users (id) on delete cascade,
  age_band      text,                       -- '50-60' | '60-70' | '70-plus' | 'onbekend'
  activity      text,                       -- 'bijna-niet' | 'af-en-toe' | 'regelmatig'
  focus         text,                       -- 'Kracht' | 'Balans' | 'Soepelheid' | 'Algemeen vitaal'
  can_stand_up  text,                       -- 'ja' | 'met-steun' | 'nee' | 'onbekend'
  avoid         text[] default '{}',        -- vermeden bewegingen
  level         text not null default 'Rustig starten',
  onboarded     boolean not null default false,
  safety_ack    boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ── Instellingen / herinneringen ───────────────────────────────────────────
create table if not exists settings (
  user_id          uuid primary key references profiles (id) on delete cascade,
  text_scale       text not null default 'normaal',  -- normaal | groot | extra-groot
  high_contrast    boolean not null default false,
  theme            text not null default 'systeem',  -- licht | donker | systeem
  habit_anchor     text default '',                  -- 'na de koffie', ...
  reminder_enabled boolean not null default false,
  reminder_time    text default '08:30'
);

-- ── Oefenbibliotheek (seed: content/exercises.json) ────────────────────────
create table if not exists exercise_library (
  id              text primary key,         -- slug, bv. 'opstaan-uit-stoel'
  name            text not null,
  category        text not null,
  short_explanation text not null,
  why_useful      text not null,
  target_muscles  text[] not null default '{}',
  adl             text not null,
  steps           text[] not null default '{}',
  dosage          jsonb not null,           -- { rustig_starten, actief_blijven, sterker_worden }
  safety_tip      text not null,
  easier          text not null,
  harder          text not null,
  cautions        text not null,
  suitable_levels text[] not null default '{}',
  support_needed  text not null,
  equipment       text not null,
  media_placeholder text not null
);

-- ── Programma's en dagen (seed: content/program.json) ──────────────────────
create table if not exists programs (
  id          text primary key,             -- bv. '30-dagen-v1'
  title       text not null,
  total_days  int not null default 30,
  version     int not null default 1
);

create table if not exists program_days (
  id          bigserial primary key,
  program_id  text not null references programs (id) on delete cascade,
  day         int not null,
  week        int not null,
  week_theme  text not null,
  type        text not null,                -- 'Kracht basis' | 'Balans basis' | ...
  focus       text not null,
  is_rest     boolean not null default false,
  estimated_minutes int not null default 7,
  unique (program_id, day)
);

create table if not exists day_exercises (
  id              bigserial primary key,
  program_day_id  bigint not null references program_days (id) on delete cascade,
  exercise_id     text not null references exercise_library (id),
  position        int not null default 0
);

-- ── Voltooiingen (sessies) ─────────────────────────────────────────────────
create table if not exists completions (
  id          bigserial primary key,
  user_id     uuid not null references profiles (id) on delete cascade,
  date        date not null,
  day         int not null,                 -- programmadag
  type        text,
  is_rest     boolean not null default false,
  done_ids    text[] not null default '{}',
  minutes     int not null default 0,
  finished    boolean not null default false,
  created_at  timestamptz not null default now(),
  unique (user_id, date, day)
);

-- ── Streak (afgeleid, maar cachebaar) ──────────────────────────────────────
create table if not exists streaks (
  user_id        uuid primary key references profiles (id) on delete cascade,
  current_streak int not null default 0,
  current_day    int not null default 1,
  cycle          int not null default 1,
  updated_at     timestamptz not null default now()
);

-- ── Badges ─────────────────────────────────────────────────────────────────
create table if not exists badges (
  id          text primary key,             -- 'eerste-stap', ...
  name        text not null,
  unlock_copy text not null,
  hint        text not null
);

create table if not exists user_badges (
  user_id     uuid not null references profiles (id) on delete cascade,
  badge_id    text not null references badges (id) on delete cascade,
  earned_at   timestamptz not null default now(),
  primary key (user_id, badge_id)
);

-- ── Row Level Security (gebruiker ziet alleen eigen data) ──────────────────
alter table profiles    enable row level security;
alter table settings    enable row level security;
alter table completions enable row level security;
alter table streaks     enable row level security;
alter table user_badges enable row level security;

-- Voorbeeldpolicy (herhaal per tabel met eigen user-kolom):
-- create policy "eigen profiel" on profiles
--   for all using (auth.uid() = id) with check (auth.uid() = id);
-- create policy "eigen data" on completions
--   for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- exercise_library / programs / program_days / day_exercises / badges zijn
-- gedeelde content: alleen-lezen voor iedereen, schrijven via service role.

-- ── App-state snapshot — DIT GEBRUIKT DE MVP-SYNC ──────────────────────────
-- De app bewaart de hele lokale state als één JSON-snapshot per gebruiker
-- (last-write-wins op updated_at). Werkende RLS-policies zijn vereist, anders
-- weigert Supabase de upsert onder de anon-key.
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
