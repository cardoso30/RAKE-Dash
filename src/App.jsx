import { useState, useEffect } from "react";
import {
  LayoutDashboard, Megaphone, DollarSign, Users,
  GitBranch, FileText, CheckSquare, Bell, Settings, ChevronRight
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

// ─── RAKE BRAND PALETTE ──────────────────────────────────────────────────────
// RAKE Brand Identity Book V1.0 · 2025
// 60% #090909 · 25% #FFFFFF · 10% #00FF85 · 5% #1C1C1C
const C = {
  bg:      '#090909',
  s1:      '#0E0E0E',
  s2:      '#1C1C1C',
  s3:      '#232323',
  s4:      '#2A2A2A',
  border:  '#2A2A2A',
  text:    '#FFFFFF',
  sub:     'rgba(255,255,255,0.45)',
  muted:   'rgba(255,255,255,0.2)',
  neon:    '#00FF85',
  neonBg:  'rgba(0,255,133,0.08)',
  red:     '#FF4455',
  amber:   '#FFB020',
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const revenueData = [
  { month: 'Nov', receita: 52000, meta: 60000 },
  { month: 'Dez', receita: 68000, meta: 65000 },
  { month: 'Jan', receita: 71000, meta: 70000 },
  { month: 'Fev', receita: 64000, meta: 72000 },
  { month: 'Mar', receita: 82000, meta: 75000 },
  { month: 'Abr', receita: 87400, meta: 80000 },
];

const campaigns = [
  { name: 'BetPlay — Google Ads', platform: 'Google',    budget: 15000, spent: 12800, cpl: 42, roas: 4.8, conv: 305, status: 'ativo'   },
  { name: 'KTO — Meta Ads',       platform: 'Meta',      budget: 20000, spent: 18500, cpl: 61, roas: 3.9, conv: 303, status: 'ativo'   },
  { name: 'EstrelaBet — Native',  platform: 'Taboola',   budget: 8000,  spent: 7200,  cpl: 55, roas: 3.1, conv: 131, status: 'ativo'   },
  { name: 'Betano — YouTube',     platform: 'YouTube',   budget: 12000, spent: 9100,  cpl: 48, roas: 4.2, conv: 190, status: 'pausado' },
  { name: 'Pixbet — TikTok',      platform: 'TikTok',    budget: 10000, spent: 8700,  cpl: 39, roas: 5.1, conv: 223, status: 'ativo'   },
  { name: 'Blaze — Push Ads',     platform: 'Propeller', budget: 6000,  spent: 5900,  cpl: 67, roas: 2.8, conv: 88,  status: 'pausado' },
];

const affiliates = [
  { name: 'Pedro Alves',   tier: 'Diamond', conv: 423, revenue: 28400, commission: 5680, status: 'ativo',   trend: '+12%', pos: true  },
  { name: 'Mariana Costa', tier: 'Gold',    conv: 287, revenue: 19200, commission: 3840, status: 'ativo',   trend: '+8%',  pos: true  },
  { name: 'Rafael Torres', tier: 'Gold',    conv: 241, revenue: 16100, commission: 3220, status: 'ativo',   trend: '-3%',  pos: false },
  { name: 'Juliana Lima',  tier: 'Silver',  conv: 178, revenue: 11900, commission: 2380, status: 'ativo',   trend: '+22%', pos: true  },
  { name: 'Gustavo Nunes', tier: 'Silver',  conv: 134, revenue: 8950,  commission: 1790, status: 'inativo', trend: '-15%', pos: false },
  { name: 'Camila Rocha',  tier: 'Bronze',  conv: 89,  revenue: 5950,  commission: 1190, status: 'ativo',   trend: '+5%',  pos: true  },
];

const pipeline = {
  Prospecção:  [
    { name: 'Cassino BR',    value: 45000,  contact: 'Lucas M.',    days: 3  },
    { name: 'SportBet Plus', value: 32000,  contact: 'Ana F.',      days: 7  },
  ],
  Qualificado: [
    { name: 'BetVip',        value: 78000,  contact: 'Thiago R.',   days: 12 },
    { name: 'MaxBet',        value: 28000,  contact: 'Fernanda S.', days: 5  },
  ],
  Proposta:    [
    { name: 'BetUniverse',   value: 120000, contact: 'Ricardo A.',  days: 18 },
  ],
  Negociação:  [
    { name: 'WinnerBet',     value: 95000,  contact: 'Patricia L.', days: 24 },
    { name: 'AceBet',        value: 55000,  contact: 'Marco V.',    days: 31 },
  ],
  Fechado:     [
    { name: 'KTO Brasil',    value: 88000,  contact: 'João P.',     days: 45 },
  ],
};

const stageColor = { Prospecção: C.sub, Qualificado: 'rgba(255,255,255,0.55)', Proposta: C.amber, Negociação: C.neon, Fechado: C.neon };

const clients = [
  { name: 'KTO Brasil', type: 'Performance', value: 88000,  status: 'ativo',    renewal: 'Out 2026' },
  { name: 'EstrelaBet', type: 'Full Service', value: 72000,  status: 'ativo',    renewal: 'Jul 2026' },
  { name: 'Betano',     type: 'Performance', value: 95000,  status: 'ativo',    renewal: 'Dez 2026' },
  { name: 'Pixbet',     type: 'Mídia',       value: 48000,  status: 'ativo',    renewal: 'Jun 2026' },
  { name: 'BetPlay',    type: 'Full Service', value: 110000, status: 'ativo',    renewal: 'Mar 2027' },
  { name: 'Blaze',      type: 'Mídia',       value: 38000,  status: 'suspenso', renewal: 'Mai 2026' },
];

const tasks = [
  { title: 'Subir nova campanha KTO — Google',  priority: 'alta',  status: 'pendente',     due: 'Hoje',   tag: 'Campanhas'  },
  { title: 'Proposta comercial BetUniverse',    priority: 'alta',  status: 'em andamento', due: '23 Abr', tag: 'Pipeline'   },
  { title: 'Enviar relatório mensal BetPlay',   priority: 'alta',  status: 'pendente',     due: 'Amanhã', tag: 'Clientes'   },
  { title: 'Revisar comissões de Abril',        priority: 'media', status: 'em andamento', due: '24 Abr', tag: 'Financeiro' },
  { title: 'Onboarding afiliado Gustavo Nunes', priority: 'media', status: 'em andamento', due: '25 Abr', tag: 'Afiliados'  },
  { title: 'Renovar contrato EstrelaBet',       priority: 'media', status: 'pendente',     due: '30 Abr', tag: 'Contratos'  },
  { title: 'Análise criativa — Pixbet TikTok',  priority: 'baixa', status: 'pendente',     due: '28 Abr', tag: 'Campanhas'  },
  { title: 'Configurar pixel Taboola — MaxBet', priority: 'baixa', status: 'concluido',    due: '21 Abr', tag: 'Campanhas'  },
];

const ledger = [
  { date: '22 Abr', desc: 'Pagamento KTO Brasil',  cat: 'Receita', value: 22000, type: 'entrada' },
  { date: '21 Abr', desc: 'Comissão Pedro Alves',  cat: 'Afiliado', value: 5680, type: 'saída'   },
  { date: '20 Abr', desc: 'Pagamento BetPlay',     cat: 'Receita', value: 18000, type: 'entrada' },
  { date: '19 Abr', desc: 'Budget Google Ads KTO', cat: 'Mídia',   value: 12800, type: 'saída'   },
  { date: '18 Abr', desc: 'Pagamento Betano',       cat: 'Receita', value: 24000, type: 'entrada' },
  { date: '18 Abr', desc: 'Budget Meta Ads',       cat: 'Mídia',   value: 18500, type: 'saída'   },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmtFull = n => `R$ ${n.toLocaleString('pt-BR')}`;
const fmtK    = n => `R$${(n/1000).toFixed(0)}k`;
const statusColor  = s => s==='ativo' ? C.neon : s==='pausado' ? C.amber : s==='suspenso' ? C.red : s==='inativo' ? C.red : C.sub;
const tierColor    = t => t==='Diamond' ? C.neon : t==='Gold' ? '#FFD700' : t==='Silver' ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)';
const priorityColor= p => p==='alta' ? C.red : p==='media' ? C.amber : C.sub;
const taskStatusColor = s => s==='concluido' ? C.neon : s==='em andamento' ? C.amber : C.sub;

// ─── ATOMS ────────────────────────────────────────────────────────────────────
// Rake Tines — Brand element /// (escala e opacidade decrescente)
const Tines = ({ size=16 }) => (
  <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, letterSpacing:'-2px', fontSize:size, lineHeight:1 }}>
    <span style={{ color:C.neon, opacity:1   }}>/</span>
    <span style={{ color:C.neon, opacity:0.55}}>/</span>
    <span style={{ color:C.neon, opacity:0.25}}>/</span>
  </span>
);

const mono = { fontFamily:"'DM Mono',monospace" };
const display = { fontFamily:"'Barlow Condensed',sans-serif" };

const Badge = ({ text, color }) => (
  <span style={{ ...mono, display:'inline-block', fontSize:9, fontWeight:500, padding:'3px 8px', borderRadius:2,
    background:color+'18', color, letterSpacing:'0.08em', textTransform:'uppercase', whiteSpace:'nowrap' }}>
    {text}
  </span>
);

const NeonBtn = ({ children, onClick }) => (
  <button onClick={onClick} style={{ ...display, fontSize:12, fontWeight:900, letterSpacing:'0.05em',
    textTransform:'uppercase', background:C.neon, color:'#090909', border:'none',
    borderRadius:3, padding:'8px 18px', cursor:'pointer' }}>
    {children}
  </button>
);

const Card = ({ children, style={} }) => (
  <div style={{ background:C.s2, border:`1px solid ${C.border}`, borderRadius:4, padding:'22px', ...style }}>
    {children}
  </div>
);

const KpiCard = ({ label, value, sub, accent=false }) => (
  <div style={{ flex:1, minWidth:0, background:accent?C.neonBg:C.s2,
    border:`1px solid ${accent?C.neon+'40':C.border}`, borderRadius:4, padding:'18px 20px' }}>
    <div style={{ ...mono, fontSize:9, color:C.muted, marginBottom:10, fontWeight:500,
      textTransform:'uppercase', letterSpacing:'0.12em' }}>{label}</div>
    <div style={{ ...display, fontSize:28, fontWeight:900, color:accent?C.neon:C.text,
      letterSpacing:'-0.5px', marginBottom:4 }}>{value}</div>
    {sub && <div style={{ ...mono, fontSize:10, color:C.sub }}>{sub}</div>}
  </div>
);

const SLabel = ({ children }) => (
  <div style={{ ...mono, fontSize:9, color:C.muted, fontWeight:500, textTransform:'uppercase',
    letterSpacing:'0.12em', marginBottom:16, display:'flex', alignItems:'center', gap:6 }}>
    <span style={{ color:C.neon }}>/</span>{children}
  </div>
);

const TH = ({ ch }) => (
  <th style={{ ...mono, fontSize:9, color:C.muted, fontWeight:500, textAlign:'left',
    padding:'8px 14px', borderBottom:`1px solid ${C.border}`,
    letterSpacing:'0.1em', textTransform:'uppercase', whiteSpace:'nowrap' }}>{ch}</th>
);
const TD = ({ children, style={} }) => (
  <td style={{ ...mono, fontSize:11, color:C.text, padding:'11px 14px',
    borderBottom:`1px solid ${C.border}`, ...style }}>{children}</td>
);

const ttStyle = { background:C.s3, border:`1px solid ${C.border}`, borderRadius:3,
  color:C.text, fontSize:10, fontFamily:"'DM Mono',monospace" };

// ─── SECTIONS ─────────────────────────────────────────────────────────────────
const Overview = () => (
  <>
    <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:16 }}>
      <KpiCard label="Receita Mensal"   value="R$ 87.400" sub="▲ 6,6% vs mês anterior" accent />
      <KpiCard label="Afiliados Ativos" value="24"        sub="3 novos este mês" />
      <KpiCard label="Campanhas Ativas" value="11"        sub="2 pausadas" />
      <KpiCard label="Conv. / Abril"    value="1.847"     sub="CPL médio: R$ 47" />
      <KpiCard label="ROAS Médio"       value="4.2×"      sub="Meta: 3.8× ✓" accent />
      <KpiCard label="Pipeline Total"   value="R$ 453k"   sub="7 deals em aberto" />
    </div>

    <div style={{ display:'flex', gap:10, marginBottom:16 }}>
      <Card style={{ flex:2 }}>
        <SLabel>Receita vs Meta — 6 meses</SLabel>
        <ResponsiveContainer width="100%" height={190}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="gN" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor={C.neon} stopOpacity={0.2}/>
                <stop offset="100%" stopColor={C.neon} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
            <XAxis dataKey="month" tick={{ fill:C.muted, fontSize:10, fontFamily:'DM Mono' }} axisLine={false} tickLine={false}/>
            <YAxis tick={{ fill:C.muted, fontSize:10, fontFamily:'DM Mono' }} axisLine={false} tickLine={false} tickFormatter={v=>`${v/1000}k`}/>
            <Tooltip contentStyle={ttStyle} formatter={v=>fmtFull(v)}/>
            <Area type="monotone" dataKey="receita" stroke={C.neon}  fill="url(#gN)" strokeWidth={2} name="Receita"/>
            <Area type="monotone" dataKey="meta"    stroke={C.muted} fill="none"     strokeWidth={1} strokeDasharray="5 4" name="Meta"/>
          </AreaChart>
        </ResponsiveContainer>
      </Card>
      <Card style={{ flex:1 }}>
        <SLabel>Urgente</SLabel>
        {tasks.filter(t=>t.priority==='alta'&&t.status!=='concluido').map((t,i,arr)=>(
          <div key={i} style={{ display:'flex', gap:10, padding:'10px 0', borderBottom:i<arr.length-1?`1px solid ${C.border}`:'none' }}>
            <div style={{ width:4, height:4, borderRadius:'50%', background:C.red, marginTop:5, flexShrink:0 }}/>
            <div>
              <div style={{ ...mono, fontSize:11, color:C.text, lineHeight:1.5 }}>{t.title}</div>
              <div style={{ ...mono, fontSize:9, color:C.muted, marginTop:3 }}>{t.due} · {t.tag}</div>
            </div>
          </div>
        ))}
      </Card>
    </div>

    <Card>
      <SLabel>Top Campanhas — Abril</SLabel>
      <table style={{ width:'100%', borderCollapse:'collapse' }}>
        <thead><tr>{['Campanha','Plataforma','Gasto','CPL','ROAS','Conv.','Status'].map(h=><TH key={h} ch={h}/>)}</tr></thead>
        <tbody>
          {campaigns.slice(0,4).map((c,i)=>(
            <tr key={i} style={{ opacity:c.status==='pausado'?0.4:1 }}>
              <TD style={{ fontWeight:600 }}>{c.name}</TD>
              <TD><Badge text={c.platform} color={C.sub}/></TD>
              <TD>{fmtFull(c.spent)}</TD>
              <TD>R$ {c.cpl}</TD>
              <TD style={{ color:c.roas>=4?C.neon:c.roas>=3?C.amber:C.red, fontWeight:700 }}>{c.roas}×</TD>
              <TD>{c.conv}</TD>
              <TD><Badge text={c.status} color={statusColor(c.status)}/></TD>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </>
);

const Campaigns = () => (
  <>
    <div style={{ display:'flex', gap:10, marginBottom:16 }}>
      <KpiCard label="Budget Total"    value="R$ 71.000" sub=""/>
      <KpiCard label="Gasto Acumulado" value="R$ 62.200" sub="87,6% do budget"/>
      <KpiCard label="Total Conv."     value="1.240"     sub="Campanhas ativas"/>
      <KpiCard label="ROAS Médio"      value="4.2×"      sub="" accent/>
    </div>
    <Card>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
        <SLabel>Campanhas</SLabel>
        <NeonBtn>+ Nova Campanha</NeonBtn>
      </div>
      <table style={{ width:'100%', borderCollapse:'collapse' }}>
        <thead><tr>{['Campanha','Plataforma','Budget','Gasto','CPL','ROAS','Conv.','Status'].map(h=><TH key={h} ch={h}/>)}</tr></thead>
        <tbody>
          {campaigns.map((c,i)=>{
            const pct=c.spent/c.budget;
            return (
              <tr key={i} style={{ opacity:c.status==='pausado'?0.4:1 }}>
                <TD style={{ fontWeight:600 }}>{c.name}</TD>
                <TD><Badge text={c.platform} color={C.sub}/></TD>
                <TD>{fmtFull(c.budget)}</TD>
                <TD>
                  <div style={{ marginBottom:5 }}>{fmtFull(c.spent)}</div>
                  <div style={{ height:2, background:C.s4, borderRadius:2, width:70 }}>
                    <div style={{ height:'100%', borderRadius:2, width:`${pct*100}%`, background:pct>0.9?C.red:C.neon }}/>
                  </div>
                </TD>
                <TD>R$ {c.cpl}</TD>
                <TD style={{ color:c.roas>=4?C.neon:c.roas>=3?C.amber:C.red, fontWeight:700 }}>{c.roas}×</TD>
                <TD>{c.conv}</TD>
                <TD><Badge text={c.status} color={statusColor(c.status)}/></TD>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  </>
);

const Financial = () => (
  <>
    <div style={{ display:'flex', gap:10, marginBottom:16 }}>
      <Card style={{ flex:2 }}>
        <SLabel>Receita vs Meta</SLabel>
        <ResponsiveContainer width="100%" height={210}>
          <BarChart data={revenueData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
            <XAxis dataKey="month" tick={{ fill:C.muted, fontSize:10, fontFamily:'DM Mono' }} axisLine={false} tickLine={false}/>
            <YAxis tick={{ fill:C.muted, fontSize:10, fontFamily:'DM Mono' }} axisLine={false} tickLine={false} tickFormatter={v=>`${v/1000}k`}/>
            <Tooltip contentStyle={ttStyle} formatter={v=>fmtFull(v)}/>
            <Bar dataKey="receita" fill={C.neon} radius={[3,3,0,0]} maxBarSize={34} name="Receita"/>
            <Bar dataKey="meta"    fill={C.s4}   radius={[3,3,0,0]} maxBarSize={34} name="Meta"/>
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card style={{ flex:1 }}>
        <SLabel>Comissões / Tier</SLabel>
        {[
          { tier:'Diamond', amount:5680,  color:C.neon },
          { tier:'Gold',    amount:7060,  color:'#FFD700' },
          { tier:'Silver',  amount:4170,  color:'rgba(255,255,255,0.6)' },
          { tier:'Bronze',  amount:1190,  color:'rgba(255,255,255,0.3)' },
        ].map((t,i)=>(
          <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:t.color }}/>
              <span style={{ ...mono, fontSize:11, color:C.text }}>{t.tier}</span>
            </div>
            <span style={{ ...display, fontSize:15, fontWeight:900, color:t.color }}>{fmtFull(t.amount)}</span>
          </div>
        ))}
        <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:12, display:'flex', justifyContent:'space-between' }}>
          <span style={{ ...mono, fontSize:10, color:C.sub }}>Total</span>
          <span style={{ ...display, fontSize:18, fontWeight:900, color:C.neon }}>R$ 18.100</span>
        </div>
      </Card>
    </div>
    <Card>
      <SLabel>Extrato Recente</SLabel>
      <table style={{ width:'100%', borderCollapse:'collapse' }}>
        <thead><tr>{['Data','Descrição','Categoria','Valor','Tipo'].map(h=><TH key={h} ch={h}/>)}</tr></thead>
        <tbody>
          {ledger.map((t,i)=>(
            <tr key={i}>
              <TD style={{ color:C.muted, whiteSpace:'nowrap' }}>{t.date}</TD>
              <TD style={{ color:C.text }}>{t.desc}</TD>
              <TD><Badge text={t.cat} color={C.sub}/></TD>
              <TD style={{ fontWeight:700, color:t.type==='entrada'?C.neon:C.red }}>
                {t.type==='entrada'?'+':'−'} {fmtFull(t.value)}
              </TD>
              <TD><Badge text={t.type} color={t.type==='entrada'?C.neon:C.red}/></TD>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </>
);

const Affiliates = () => (
  <Card>
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
      <SLabel>Rede de Afiliados</SLabel>
      <NeonBtn>+ Novo Afiliado</NeonBtn>
    </div>
    <table style={{ width:'100%', borderCollapse:'collapse' }}>
      <thead><tr>{['Afiliado','Tier','Conv.','Receita','Comissão','Tend.','Status'].map(h=><TH key={h} ch={h}/>)}</tr></thead>
      <tbody>
        {affiliates.map((a,i)=>(
          <tr key={i}>
            <TD>
              <div style={{ display:'flex', alignItems:'center', gap:9 }}>
                <div style={{ width:26, height:26, borderRadius:3, background:C.s3,
                  border:`1px solid ${tierColor(a.tier)}40`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  ...display, fontSize:10, fontWeight:900, color:tierColor(a.tier), flexShrink:0 }}>
                  {a.name.split(' ').map(n=>n[0]).join('')}
                </div>
                <span style={{ color:C.text }}>{a.name}</span>
              </div>
            </TD>
            <TD><Badge text={a.tier} color={tierColor(a.tier)}/></TD>
            <TD>{a.conv}</TD>
            <TD style={{ fontWeight:600 }}>{fmtFull(a.revenue)}</TD>
            <TD style={{ color:C.neon, fontWeight:700 }}>{fmtFull(a.commission)}</TD>
            <TD style={{ color:a.pos?C.neon:C.red, fontWeight:700 }}>{a.trend}</TD>
            <TD><Badge text={a.status} color={statusColor(a.status)}/></TD>
          </tr>
        ))}
      </tbody>
    </table>
  </Card>
);

const PipelineCRM = () => (
  <>
    <div style={{ display:'flex', gap:10, marginBottom:16 }}>
      <KpiCard label="Total Pipeline" value="R$ 453k" sub="" accent/>
      <KpiCard label="Deals Ativos"   value="7"       sub=""/>
      <KpiCard label="Maior Deal"     value="R$ 120k" sub=""/>
      <KpiCard label="Tx. Fechamento" value="14,3%"   sub=""/>
    </div>
    <div style={{ display:'flex', gap:10, overflowX:'auto', paddingBottom:6 }}>
      {Object.entries(pipeline).map(([stage,deals])=>(
        <div key={stage} style={{ minWidth:200, flex:1 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
            <span style={{ ...mono, fontSize:9, fontWeight:700, color:stageColor[stage],
              textTransform:'uppercase', letterSpacing:'0.1em' }}>/{stage}</span>
            <span style={{ ...mono, fontSize:9, color:C.muted }}>{deals.length}</span>
          </div>
          {deals.map((d,i)=>(
            <div key={i} style={{ background:C.s2, border:`1px solid ${C.border}`,
              borderLeft:`2px solid ${stageColor[stage]}`, borderRadius:3,
              padding:'14px 16px', marginBottom:8, cursor:'pointer' }}>
              <div style={{ ...mono, fontSize:11, fontWeight:600, color:C.text, marginBottom:8 }}>{d.name}</div>
              <div style={{ ...display, fontSize:22, fontWeight:900, color:stageColor[stage], marginBottom:8 }}>{fmtK(d.value)}</div>
              <div style={{ ...mono, fontSize:9, color:C.muted }}>{d.contact} · {d.days}d</div>
            </div>
          ))}
          <div style={{ border:`1px dashed ${C.border}`, borderRadius:3, padding:'9px',
            textAlign:'center', ...mono, fontSize:9, color:C.muted, cursor:'pointer' }}>+ deal</div>
        </div>
      ))}
    </div>
  </>
);

const Clients = () => (
  <Card>
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
      <SLabel>Contratos</SLabel>
      <NeonBtn>+ Novo Contrato</NeonBtn>
    </div>
    <table style={{ width:'100%', borderCollapse:'collapse' }}>
      <thead><tr>{['Cliente','Modelo','Valor Anual','Status','Próx. Renovação'].map(h=><TH key={h} ch={h}/>)}</tr></thead>
      <tbody>
        {clients.map((c,i)=>{
          const near=c.renewal.includes('Jun')||c.renewal.includes('Mai');
          return (
            <tr key={i}>
              <TD style={{ fontWeight:700, color:C.text }}>{c.name}</TD>
              <TD><Badge text={c.type} color={C.sub}/></TD>
              <TD style={{ color:C.neon, fontWeight:700 }}>{fmtFull(c.value)}</TD>
              <TD><Badge text={c.status} color={statusColor(c.status)}/></TD>
              <TD style={{ color:near?C.amber:C.sub, fontWeight:near?600:400 }}>{near&&'⚠ '}{c.renewal}</TD>
            </tr>
          );
        })}
      </tbody>
    </table>
    <div style={{ display:'flex', gap:28, padding:'16px 14px 0', borderTop:`1px solid ${C.border}`, marginTop:8 }}>
      {[
        { label:'Valor Total', value:'R$ 451.000', color:C.neon  },
        { label:'Ativos',      value:'5',          color:C.text  },
        { label:'Renov. Próx', value:'2',          color:C.amber },
      ].map((s,i)=>(
        <div key={i}>
          <div style={{ ...mono, fontSize:9, color:C.muted, marginBottom:4, textTransform:'uppercase', letterSpacing:'0.1em' }}>{s.label}</div>
          <div style={{ ...display, fontSize:22, fontWeight:900, color:s.color }}>{s.value}</div>
        </div>
      ))}
    </div>
  </Card>
);

const TasksSection = () => {
  const [filter, setFilter] = useState('todos');
  const filtered = filter==='todos' ? tasks : tasks.filter(t=>t.status===filter);
  return (
    <>
      <div style={{ display:'flex', gap:8, marginBottom:16, alignItems:'center' }}>
        {['todos','pendente','em andamento','concluido'].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{
            ...mono, fontSize:9, padding:'6px 14px', borderRadius:2, cursor:'pointer',
            fontWeight:filter===f?700:500, textTransform:'uppercase', letterSpacing:'0.08em',
            background:filter===f?C.neon:'transparent',
            color:filter===f?'#090909':C.sub,
            border:`1px solid ${filter===f?C.neon:C.border}`,
          }}>{f}</button>
        ))}
        <div style={{ flex:1 }}/>
        <NeonBtn>+ Nova Tarefa</NeonBtn>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
        {filtered.map((t,i)=>(
          <div key={i} style={{
            background:C.s2, border:`1px solid ${C.border}`,
            borderLeft:`2px solid ${priorityColor(t.priority)}`,
            borderRadius:3, display:'flex', alignItems:'center', gap:14, padding:'13px 18px',
            opacity:t.status==='concluido'?0.4:1,
          }}>
            <div style={{ width:13, height:13, borderRadius:2, flexShrink:0,
              background:t.status==='concluido'?C.neon:'transparent',
              border:`1.5px solid ${t.status==='concluido'?C.neon:C.border}` }}/>
            <div style={{ flex:1 }}>
              <div style={{ ...mono, fontSize:12, color:C.text,
                textDecoration:t.status==='concluido'?'line-through':'none' }}>{t.title}</div>
              <div style={{ display:'flex', gap:8, marginTop:5, alignItems:'center' }}>
                <Badge text={t.tag} color={C.sub}/>
                <span style={{ ...mono, fontSize:9, color:C.muted }}>{t.due}</span>
              </div>
            </div>
            <Badge text={t.priority} color={priorityColor(t.priority)}/>
            <Badge text={t.status}   color={taskStatusColor(t.status)}/>
          </div>
        ))}
      </div>
    </>
  );
};

// ─── NAV ──────────────────────────────────────────────────────────────────────
const nav = [
  { id:'overview',   label:'Overview',     icon:LayoutDashboard, C:Overview     },
  { id:'campaigns',  label:'Campanhas',    icon:Megaphone,       C:Campaigns    },
  { id:'financial',  label:'Financeiro',   icon:DollarSign,      C:Financial    },
  { id:'affiliates', label:'Afiliados',    icon:Users,           C:Affiliates   },
  { id:'pipeline',   label:'Pipeline CRM', icon:GitBranch,       C:PipelineCRM  },
  { id:'clients',    label:'Clientes',     icon:FileText,        C:Clients      },
  { id:'tasks',      label:'Tarefas',      icon:CheckSquare,     C:TasksSection },
];

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function RakeDashboard() {
  const [section, setSection] = useState('overview');

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=DM+Mono:ital,wght@0,400;0,500&display=swap';
    document.head.appendChild(link);
    return () => { try { document.head.removeChild(link); } catch(e){} };
  }, []);

  const active = nav.find(n=>n.id===section);
  const ActiveSection = active?.C || Overview;

  return (
    <div style={{ display:'flex', height:'100vh', background:C.bg, color:C.text,
      fontFamily:"'DM Mono',monospace", overflow:'hidden' }}>

      {/* SIDEBAR */}
      <nav style={{ width:218, background:C.s1, borderRight:`1px solid ${C.border}`,
        display:'flex', flexDirection:'column', flexShrink:0 }}>

        {/* Logo — /RAKE brand system */}
        <div style={{ padding:'22px 20px 20px', borderBottom:`1px solid ${C.border}` }}>
          <div style={{ display:'flex', alignItems:'center', gap:4, marginBottom:6 }}>
            <Tines size={18}/>
          </div>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900,
            fontSize:30, letterSpacing:'-1px', lineHeight:1, color:C.text }}>
            <span style={{ color:C.neon }}>/</span>RAKE
          </div>
          <div style={{ ...mono, fontSize:8, color:C.muted, marginTop:4, letterSpacing:'0.14em', textTransform:'uppercase' }}>
            Affiliate Agency · Casino Performance
          </div>
        </div>

        {/* Nav */}
        <div style={{ padding:'12px 10px', flex:1, overflowY:'auto' }}>
          {nav.map(item=>{
            const act = section===item.id;
            const Icon = item.icon;
            return (
              <div key={item.id} onClick={()=>setSection(item.id)} style={{
                display:'flex', alignItems:'center', gap:10, padding:'9px 12px',
                borderRadius:2, cursor:'pointer', marginBottom:1,
                background:act?C.s3:'transparent',
                color:act?C.text:C.sub,
                fontSize:11, fontWeight:act?500:400,
                borderLeft:`2px solid ${act?C.neon:'transparent'}`,
                transition:'all 0.1s',
              }}>
                <Icon size={12}/>
                {item.label}
                {act&&<ChevronRight size={10} style={{ marginLeft:'auto', color:C.neon }}/>}
              </div>
            );
          })}
        </div>

        {/* User */}
        <div style={{ padding:'16px 20px', borderTop:`1px solid ${C.border}` }}>
          <div style={{ ...mono, fontSize:11, fontWeight:500, color:C.text }}>Allan · Founder</div>
          <div style={{ ...mono, fontSize:9, color:C.muted, marginTop:2 }}>CG Group</div>
        </div>
      </nav>

      {/* MAIN */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'14px 26px', borderBottom:`1px solid ${C.border}`, background:C.s1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <Tines size={13}/>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900,
              fontSize:22, letterSpacing:'-0.3px', color:C.text }}>
              {active?.label?.toUpperCase()}
            </span>
          </div>
          <div style={{ display:'flex', gap:16, alignItems:'center' }}>
            <span style={{ ...mono, fontSize:9, color:C.muted }}>22.04.2026</span>
            <Bell     size={13} color={C.muted} style={{ cursor:'pointer' }}/>
            <Settings size={13} color={C.muted} style={{ cursor:'pointer' }}/>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex:1, overflow:'auto', padding:'22px 26px' }}>
          <ActiveSection/>
        </div>
      </div>
    </div>
  );
}
