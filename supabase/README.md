# Supabase setup

1. Create a project at https://supabase.com.
2. Open **SQL Editor** in the Supabase dashboard.
3. Paste and run `supabase/schema.sql`.
4. In **Authentication > Providers**, enable Email.
5. Copy the project URL and publishable key into the frontend environment file.

Create `frontend/.env.local`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
VITE_API_URL=http://localhost:5000
```

The database is protected with Row Level Security. Every lesson and quiz must carry the signed-in user's `user_id`; users can only read, create, update, or delete their own records.

Do not put the Supabase service-role key or Gemini key in frontend files. The service-role key belongs only on a trusted backend, if it is needed later.
