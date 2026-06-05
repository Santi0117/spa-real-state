-- Jopa Real Estate — ejecutá en Supabase → SQL Editor

-- Mensajes del asistente virtual (opcional, para historial y análisis)
create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  provider text,
  created_at timestamptz not null default now()
);

create index if not exists chat_messages_session_id_idx
  on public.chat_messages (session_id);

create index if not exists chat_messages_created_at_idx
  on public.chat_messages (created_at desc);

alter table public.chat_messages enable row level security;

-- Sin políticas públicas: solo el service role (API del servidor) inserta.
