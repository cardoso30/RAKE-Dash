# /RAKE · Admin Dashboard

## Setup em 5 passos

### 1. Criar projeto no Supabase
Acesse [supabase.com](https://supabase.com) → New Project → anote a **URL** e a **anon key**

### 2. Criar o banco de dados
No painel do Supabase: **SQL Editor** → Cole todo o conteúdo de `schema.sql` → Run

### 3. Configurar variáveis de ambiente
```bash
cp .env.example .env
```
Edite o `.env` com seus dados do Supabase:
```
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key
```

### 4. Instalar e rodar local
```bash
npm install
npm run dev
```
Acesse: http://localhost:5173

### 5. Deploy na Vercel (opcional)
```bash
npm install -g vercel
vercel
```
Na Vercel, adicione as mesmas variáveis de ambiente em:
Project Settings → Environment Variables

---

## O que está salvo no banco

| Tabela       | O que armazena          | Operações             |
|--------------|-------------------------|-----------------------|
| `tasks`      | Tarefas e prazos        | Criar, alterar status |
| `campaigns`  | Campanhas de mídia      | Criar, pausar/ativar  |
| `affiliates` | Rede de afiliados       | Criar                 |
| `deals`      | Pipeline CRM            | Criar, mover estágio  |
| `clients`    | Contratos               | Criar                 |
| `ledger`     | Extrato financeiro      | Criar lançamentos     |
