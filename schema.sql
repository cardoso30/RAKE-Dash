-- ═══════════════════════════════════════════════════════
-- /RAKE · Admin Dashboard — Schema SQL
-- Cole este arquivo inteiro no SQL Editor do Supabase
-- ═══════════════════════════════════════════════════════

-- TASKS
create table tasks (
  id          uuid default gen_random_uuid() primary key,
  title       text not null,
  priority    text not null default 'media',  -- 'alta' | 'media' | 'baixa'
  status      text not null default 'pendente', -- 'pendente' | 'em andamento' | 'concluido'
  due         text,
  tag         text,
  created_at  timestamptz default now()
);

-- CAMPAIGNS
create table campaigns (
  id          uuid default gen_random_uuid() primary key,
  name        text not null,
  platform    text,
  budget      numeric default 0,
  spent       numeric default 0,
  cpl         numeric default 0,
  roas        numeric default 0,
  conv        integer default 0,
  status      text default 'ativo',  -- 'ativo' | 'pausado'
  created_at  timestamptz default now()
);

-- AFFILIATES
create table affiliates (
  id          uuid default gen_random_uuid() primary key,
  name        text not null,
  tier        text default 'Bronze',  -- 'Diamond' | 'Gold' | 'Silver' | 'Bronze'
  conv        integer default 0,
  revenue     numeric default 0,
  commission  numeric default 0,
  status      text default 'ativo',   -- 'ativo' | 'inativo'
  trend       text default '+0%',
  pos         boolean default true,
  created_at  timestamptz default now()
);

-- PIPELINE DEALS
create table deals (
  id          uuid default gen_random_uuid() primary key,
  name        text not null,
  value       numeric default 0,
  contact     text,
  days        integer default 0,
  stage       text default 'Prospecção',  -- 'Prospecção' | 'Qualificado' | 'Proposta' | 'Negociação' | 'Fechado'
  created_at  timestamptz default now()
);

-- CLIENTS / CONTRACTS
create table clients (
  id          uuid default gen_random_uuid() primary key,
  name        text not null,
  type        text,   -- 'Performance' | 'Full Service' | 'Mídia' | 'Consultoria'
  value       numeric default 0,
  status      text default 'ativo',   -- 'ativo' | 'suspenso'
  renewal     text,
  created_at  timestamptz default now()
);

-- LEDGER (financeiro)
create table ledger (
  id          uuid default gen_random_uuid() primary key,
  date        text,
  description text,
  cat         text,   -- 'Receita' | 'Afiliado' | 'Mídia' | 'Operacional' | 'Outros'
  value       numeric default 0,
  type        text default 'entrada',  -- 'entrada' | 'saída'
  created_at  timestamptz default now()
);

-- ─── RLS (Row Level Security) ─────────────────────────────────────────────────
alter table tasks      enable row level security;
alter table campaigns  enable row level security;
alter table affiliates enable row level security;
alter table deals      enable row level security;
alter table clients    enable row level security;
alter table ledger     enable row level security;

-- Políticas: acesso total (tool interno, sem auth por ora)
create policy "allow_all" on tasks      for all using (true) with check (true);
create policy "allow_all" on campaigns  for all using (true) with check (true);
create policy "allow_all" on affiliates for all using (true) with check (true);
create policy "allow_all" on deals      for all using (true) with check (true);
create policy "allow_all" on clients    for all using (true) with check (true);
create policy "allow_all" on ledger     for all using (true) with check (true);

-- ─── SEED DATA ────────────────────────────────────────────────────────────────
insert into tasks (title, priority, status, due, tag) values
  ('Subir nova campanha KTO — Google', 'alta',  'pendente',     'Hoje',   'Campanhas'),
  ('Proposta comercial BetUniverse',   'alta',  'em andamento', '23 Abr', 'Pipeline'),
  ('Enviar relatório mensal BetPlay',  'alta',  'pendente',     'Amanhã', 'Clientes'),
  ('Revisar comissões de Abril',       'media', 'em andamento', '24 Abr', 'Financeiro'),
  ('Onboarding afiliado Gustavo Nunes','media', 'em andamento', '25 Abr', 'Afiliados'),
  ('Renovar contrato EstrelaBet',      'media', 'pendente',     '30 Abr', 'Contratos'),
  ('Análise criativa — Pixbet TikTok', 'baixa', 'pendente',     '28 Abr', 'Campanhas'),
  ('Configurar pixel Taboola — MaxBet','baixa', 'concluido',    '21 Abr', 'Campanhas');

insert into campaigns (name, platform, budget, spent, cpl, roas, conv, status) values
  ('BetPlay — Google Ads', 'Google',    15000, 12800, 42, 4.8, 305, 'ativo'),
  ('KTO — Meta Ads',       'Meta',      20000, 18500, 61, 3.9, 303, 'ativo'),
  ('EstrelaBet — Native',  'Taboola',   8000,  7200,  55, 3.1, 131, 'ativo'),
  ('Betano — YouTube',     'YouTube',   12000, 9100,  48, 4.2, 190, 'pausado'),
  ('Pixbet — TikTok',      'TikTok',    10000, 8700,  39, 5.1, 223, 'ativo'),
  ('Blaze — Push Ads',     'Propeller', 6000,  5900,  67, 2.8, 88,  'pausado');

insert into affiliates (name, tier, conv, revenue, commission, status, trend, pos) values
  ('Pedro Alves',   'Diamond', 423, 28400, 5680, 'ativo',   '+12%', true),
  ('Mariana Costa', 'Gold',    287, 19200, 3840, 'ativo',   '+8%',  true),
  ('Rafael Torres', 'Gold',    241, 16100, 3220, 'ativo',   '-3%',  false),
  ('Juliana Lima',  'Silver',  178, 11900, 2380, 'ativo',   '+22%', true),
  ('Gustavo Nunes', 'Silver',  134, 8950,  1790, 'inativo', '-15%', false),
  ('Camila Rocha',  'Bronze',  89,  5950,  1190, 'ativo',   '+5%',  true);

insert into deals (name, value, contact, days, stage) values
  ('Cassino BR',    45000,  'Lucas M.',    3,  'Prospecção'),
  ('SportBet Plus', 32000,  'Ana F.',      7,  'Prospecção'),
  ('BetVip',        78000,  'Thiago R.',   12, 'Qualificado'),
  ('MaxBet',        28000,  'Fernanda S.', 5,  'Qualificado'),
  ('BetUniverse',   120000, 'Ricardo A.',  18, 'Proposta'),
  ('WinnerBet',     95000,  'Patricia L.', 24, 'Negociação'),
  ('AceBet',        55000,  'Marco V.',    31, 'Negociação'),
  ('KTO Brasil',    88000,  'João P.',     45, 'Fechado');

insert into clients (name, type, value, status, renewal) values
  ('KTO Brasil', 'Performance', 88000,  'ativo',    'Out 2026'),
  ('EstrelaBet', 'Full Service', 72000,  'ativo',   'Jul 2026'),
  ('Betano',     'Performance', 95000,  'ativo',    'Dez 2026'),
  ('Pixbet',     'Mídia',       48000,  'ativo',    'Jun 2026'),
  ('BetPlay',    'Full Service', 110000, 'ativo',   'Mar 2027'),
  ('Blaze',      'Mídia',       38000,  'suspenso', 'Mai 2026');

insert into ledger (date, description, cat, value, type) values
  ('22 Abr', 'Pagamento KTO Brasil',  'Receita', 22000, 'entrada'),
  ('21 Abr', 'Comissão Pedro Alves',  'Afiliado', 5680, 'saída'),
  ('20 Abr', 'Pagamento BetPlay',     'Receita', 18000, 'entrada'),
  ('19 Abr', 'Budget Google Ads KTO', 'Mídia',   12800, 'saída'),
  ('18 Abr', 'Pagamento Betano',       'Receita', 24000, 'entrada'),
  ('18 Abr', 'Budget Meta Ads',       'Mídia',   18500, 'saída');
