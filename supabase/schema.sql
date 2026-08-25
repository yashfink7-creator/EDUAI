-- EDUAI Supabase schema
-- Run this once in Supabase Dashboard > SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'teacher' check (role in ('teacher', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  subject text not null,
  topic text not null,
  grade text not null,
  duration integer not null check (duration > 0),
  teaching_style text not null default 'Interactive',
  plan jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quizzes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  subject text not null,
  topic text not null,
  grade text not null,
  difficulty text not null default 'Medium',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  question_order integer not null check (question_order >= 0),
  question text not null,
  options jsonb not null check (jsonb_typeof(options) = 'array'),
  answer integer not null check (answer >= 0),
  created_at timestamptz not null default now()
);

create index if not exists lessons_user_id_created_at_idx
  on public.lessons(user_id, created_at desc);
create index if not exists quizzes_user_id_created_at_idx
  on public.quizzes(user_id, created_at desc);
create index if not exists quiz_questions_quiz_id_order_idx
  on public.quiz_questions(quiz_id, question_order);

alter table public.profiles enable row level security;
alter table public.lessons enable row level security;
alter table public.quizzes enable row level security;
alter table public.quiz_questions enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can view own lessons"
  on public.lessons for select
  using (auth.uid() = user_id);
create policy "Users can create own lessons"
  on public.lessons for insert
  with check (auth.uid() = user_id);
create policy "Users can update own lessons"
  on public.lessons for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
create policy "Users can delete own lessons"
  on public.lessons for delete
  using (auth.uid() = user_id);

create policy "Users can view own quizzes"
  on public.quizzes for select
  using (auth.uid() = user_id);
create policy "Users can create own quizzes"
  on public.quizzes for insert
  with check (auth.uid() = user_id);
create policy "Users can update own quizzes"
  on public.quizzes for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
create policy "Users can delete own quizzes"
  on public.quizzes for delete
  using (auth.uid() = user_id);

create policy "Users can view questions in own quizzes"
  on public.quiz_questions for select
  using (exists (
    select 1 from public.quizzes
    where quizzes.id = quiz_questions.quiz_id
      and quizzes.user_id = auth.uid()
  ));
create policy "Users can create questions in own quizzes"
  on public.quiz_questions for insert
  with check (exists (
    select 1 from public.quizzes
    where quizzes.id = quiz_questions.quiz_id
      and quizzes.user_id = auth.uid()
  ));
create policy "Users can update questions in own quizzes"
  on public.quiz_questions for update
  using (exists (
    select 1 from public.quizzes
    where quizzes.id = quiz_questions.quiz_id
      and quizzes.user_id = auth.uid()
  ));
create policy "Users can delete questions in own quizzes"
  on public.quiz_questions for delete
  using (exists (
    select 1 from public.quizzes
    where quizzes.id = quiz_questions.quiz_id
      and quizzes.user_id = auth.uid()
  ));

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists lessons_set_updated_at on public.lessons;
create trigger lessons_set_updated_at
  before update on public.lessons
  for each row execute procedure public.set_updated_at();

drop trigger if exists quizzes_set_updated_at on public.quizzes;
create trigger quizzes_set_updated_at
  before update on public.quizzes
  for each row execute procedure public.set_updated_at();
