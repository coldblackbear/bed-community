-- profiles (auth.users 확장)
create table profiles (
  id uuid references auth.users primary key,
  nickname text not null,
  avatar_url text,
  created_at timestamptz default now()
);

-- posts
create table posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  category text not null,
  author_id uuid references profiles(id),
  view_count int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- comments
create table comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id) on delete cascade,
  author_id uuid references profiles(id),
  content text not null,
  parent_id uuid references comments(id),
  created_at timestamptz default now()
);

-- likes
create table likes (
  user_id uuid references profiles(id),
  post_id uuid references posts(id) on delete cascade,
  primary key (user_id, post_id)
);

-- indexes
create index idx_posts_category on posts(category);
create index idx_posts_created_at on posts(created_at desc);
create index idx_comments_post_id on comments(post_id);
create index idx_likes_post_id on likes(post_id);

-- RLS policies
alter table profiles enable row level security;
alter table posts enable row level security;
alter table comments enable row level security;
alter table likes enable row level security;

-- profiles: 누구나 읽기, 본인만 수정
create policy "profiles_select" on profiles for select using (true);
create policy "profiles_insert" on profiles for insert with check (auth.uid() = id);
create policy "profiles_update" on profiles for update using (auth.uid() = id);

-- posts: 누구나 읽기, 인증 사용자 작성, 본인만 수정/삭제
create policy "posts_select" on posts for select using (true);
create policy "posts_insert" on posts for insert with check (auth.uid() = author_id);
create policy "posts_update" on posts for update using (auth.uid() = author_id);
create policy "posts_delete" on posts for delete using (auth.uid() = author_id);

-- comments: 누구나 읽기, 인증 사용자 작성, 본인만 삭제
create policy "comments_select" on comments for select using (true);
create policy "comments_insert" on comments for insert with check (auth.uid() = author_id);
create policy "comments_delete" on comments for delete using (auth.uid() = author_id);

-- likes: 누구나 읽기, 본인만 추가/삭제
create policy "likes_select" on likes for select using (true);
create policy "likes_insert" on likes for insert with check (auth.uid() = user_id);
create policy "likes_delete" on likes for delete using (auth.uid() = user_id);

-- 새 유저 가입 시 자동으로 profile 생성하는 함수
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, nickname, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name', 'User'),
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
