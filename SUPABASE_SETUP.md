# Supabase Setup Guide

This guide walks you through connecting LearnThroughGame to Supabase for auth, XP persistence, and the global leaderboard.

---

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in.
2. Click **New Project** and fill in a name + database password.
3. Wait for the project to provision (~1 minute).

---

## 2. Get Your API Keys

In the Supabase dashboard, go to **Project Settings → API**.

Copy:
- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon / public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Create a `.env.local` file at the project root (it is git-ignored):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## 3. Run the SQL Schema

Go to **SQL Editor** in your Supabase dashboard and run the following:

```sql
-- Profiles table (one row per user)
create table profiles (
  id uuid references auth.users primary key,
  username text,
  character_class text default 'warrior',
  total_xp integer default 0,
  levels_completed integer default 0,
  created_at timestamptz default now()
);

-- Level completions (one row per user × course × level)
create table level_completions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  course_slug text not null,
  level_number integer not null,
  xp_earned integer not null,
  completed_at timestamptz default now(),
  unique(user_id, course_slug, level_number)
);

-- Enable Row Level Security
alter table profiles enable row level security;
alter table level_completions enable row level security;

-- Policies
create policy "Users can view all profiles"
  on profiles for select using (true);

create policy "Users can upsert own profile"
  on profiles for all using (auth.uid() = id);

create policy "Users can insert own completions"
  on level_completions for insert with check (auth.uid() = user_id);

create policy "Users can view all completions"
  on level_completions for select using (true);
```

---

## 4. Configure Auth Providers (Optional)

### GitHub OAuth
1. Go to **Authentication → Providers → GitHub**.
2. Enable GitHub and paste your GitHub OAuth App's **Client ID** and **Client Secret**.
3. Set the callback URL in your GitHub OAuth App to:
   ```
   https://your-project-id.supabase.co/auth/v1/callback
   ```

### Google OAuth
1. Go to **Authentication → Providers → Google**.
2. Enable Google and paste your Google OAuth **Client ID** and **Client Secret**.
3. Add the Supabase callback URL to your Google Cloud Console's authorized redirect URIs.

---

## 5. Restart the Dev Server

```bash
npm run dev
```

The leaderboard at `/leaderboard` will now show real data, and XP earned in-game will be persisted to Supabase.

---

## How It Works (Without Supabase)

If `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` are absent:

- Auth page shows a **Demo mode** notice and redirects immediately.
- XP is saved to **localStorage** instead.
- The leaderboard shows a **"Connect Supabase"** message.

This lets the app run fully offline for development and demos.
