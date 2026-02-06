-- brands
create table brands (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  name_ko text not null,
  country text not null default 'KR',
  logo_url text,
  website_url text,
  description text,
  created_at timestamptz default now()
);

-- mattress_products
create table mattress_products (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references brands(id) on delete cascade,
  name text not null,
  mattress_type text not null, -- innerspring, memory_foam, latex, hybrid, airbed, waterbed
  firmness int not null check (firmness between 1 and 10),
  height_cm numeric(4,1),
  price_msrp int not null, -- KRW
  price_street int,
  coil_count int,
  foam_density text,
  cover_material text,
  warranty_years int,
  trial_days int,
  sizes_available text[] default '{}',
  best_for_positions text[] default '{}',
  best_for_weights text[] default '{}',
  pros text[] default '{}',
  cons text[] default '{}',
  rating_avg numeric(2,1) default 0,
  review_count int default 0,
  image_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- price_reports (user-submitted real purchase prices)
create table price_reports (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references mattress_products(id) on delete cascade,
  reporter_id uuid references profiles(id),
  purchase_price int not null,
  purchase_date date not null,
  purchase_location text not null,
  is_online boolean default false,
  discount_info text,
  created_at timestamptz default now()
);

-- indexes
create index idx_products_brand on mattress_products(brand_id);
create index idx_products_type on mattress_products(mattress_type);
create index idx_products_firmness on mattress_products(firmness);
create index idx_products_price on mattress_products(price_msrp);
create index idx_price_reports_product on price_reports(product_id);

-- RLS
alter table brands enable row level security;
alter table mattress_products enable row level security;
alter table price_reports enable row level security;

create policy "brands_select" on brands for select using (true);
create policy "products_select" on mattress_products for select using (true);
create policy "price_reports_select" on price_reports for select using (true);
create policy "price_reports_insert" on price_reports for insert with check (auth.uid() = reporter_id);

-- seed: major brands
insert into brands (name, name_ko, country, description) values
  ('Simmons', '시몬스', 'US', '1870년 설립, 글로벌 프리미엄 매트리스 브랜드'),
  ('ACE Bed', '에이스침대', 'KR', '국내 1위 침대 브랜드, 1963년 설립'),
  ('Sealy', '씰리', 'US', '1881년 설립, 포스처피딕 기술'),
  ('Tempur', '템퍼', 'DK', 'NASA 기술 기반 메모리폼 매트리스'),
  ('Zinus', '지누스', 'KR', '아마존 매트리스 판매 1위, D2C 브랜드'),
  ('1/3', '삼분의일', 'KR', '프리미엄 매트리스의 1/3 가격, D2C'),
  ('Serta', '써타', 'US', '미국 매트리스 시장 점유율 1위'),
  ('Dreambed', '드림베드', 'JP', '일본 1위 침대 브랜드'),
  ('Coway', '코웨이', 'KR', '렌탈 매트리스 서비스'),
  ('IKEA', '이케아', 'SE', '가성비 매트리스 라인업');
