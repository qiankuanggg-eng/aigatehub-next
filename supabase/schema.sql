create extension if not exists pgcrypto;

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  plan text not null default '¥99 入门体验版',
  balance_cny numeric(10, 2) not null default 30.00,
  chat_count integer not null default 0,
  image_quota integer not null default 10,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists public.usage_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  type text not null check (type in ('Chat', 'Image2')),
  model text not null,
  prompt_summary text not null,
  cost_cny numeric(10, 2) not null default 0,
  status text not null default '成功',
  response_time_ms integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  amount_cny numeric(10, 2) not null,
  type text not null,
  note text,
  created_at timestamptz not null default now()
);

create index if not exists usage_logs_user_created_at_idx
  on public.usage_logs (user_id, created_at desc);

create index if not exists transactions_user_created_at_idx
  on public.transactions (user_id, created_at desc);

insert into public.users (
  id,
  email,
  name,
  plan,
  balance_cny,
  chat_count,
  image_quota,
  status
)
values (
  '00000000-0000-0000-0000-000000000001',
  'demo@aigatehub.local',
  'Demo User',
  '¥99 入门体验版',
  30.00,
  0,
  10,
  'active'
)
on conflict (id) do nothing;

alter table public.users enable row level security;
alter table public.usage_logs enable row level security;
alter table public.transactions enable row level security;

-- Demo-only policies for the fixed local test user. Replace these with auth.uid()
-- based policies before launching a real multi-user product.
create policy "demo user can read own profile"
  on public.users for select
  using (id = '00000000-0000-0000-0000-000000000001');

create policy "demo user can read own usage logs"
  on public.usage_logs for select
  using (user_id = '00000000-0000-0000-0000-000000000001');

create policy "demo user can insert own usage logs"
  on public.usage_logs for insert
  with check (user_id = '00000000-0000-0000-0000-000000000001');

create policy "demo user can read own transactions"
  on public.transactions for select
  using (user_id = '00000000-0000-0000-0000-000000000001');
