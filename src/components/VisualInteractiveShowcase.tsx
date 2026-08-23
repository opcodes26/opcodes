import { useState } from 'react'
import { Card } from './ui/Card'
import {
  Server,
  Cpu,
  CheckCircle2,
  Clock,
  Zap,
  Activity,
  Play,
  RotateCcw
} from 'lucide-react'

interface Ticket {
  id: string
  title: string
  source: string
  category: string
  severity: 'CRÍTICA' | 'ALTA' | 'MÉDIA'
  sla: string
  confidence: number
  assignedTo: string
  status: 'ANALISANDO' | 'CLASSIFICADO' | 'ENCAMINHADO'
}

const INITIAL_TICKETS: Ticket[] = [
  {
    id: 'INC-8492',
    title: 'Falha de conexão no cluster PostgreSQL do ERP durante fechamento fiscal',
    source: 'Monitoramento Datadog',
    category: 'Banco de Dados & Performance',
    severity: 'CRÍTICA',
    sla: '15 min (P1)',
    confidence: 99.2,
    assignedTo: 'Squad DB Core',
    status: 'ENCAMINHADO',
  },
  {
    id: 'REQ-1204',
    title: 'Solicitação de provisionamento de tenant multi-empresa com isolamento RLS',
    source: 'Portal de Clientes B2B',
    category: 'Arquitetura & Provisionamento',
    severity: 'MÉDIA',
    sla: '4h (P3)',
    confidence: 96.8,
    assignedTo: 'Automação DevOps',
    status: 'CLASSIFICADO',
  },
  {
    id: 'INC-8493',
    title: 'Tentativas repetidas de brute-force detectadas na rota de autenticação JWT',
    source: 'WAF Cloudflare',
    category: 'Segurança & Compliance',
    severity: 'ALTA',
    sla: '30 min (P2)',
    confidence: 98.5,
    assignedTo: 'SecOps Gateway',
    status: 'ENCAMINHADO',
  },
]

export function VisualInteractiveShowcase() {
  // ITSM State
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS)
  const [activeTab, setActiveTab] = useState<'itsm' | 'telemetry'>('itsm')
  const [isProcessing, setIsProcessing] = useState(false)

  // Telemetry Gauge State
  const [tonerCyan, setTonerCyan] = useState(14)
  const [replenishDispatched, setReplenishDispatched] = useState(true)

  const simulateNewTicket = () => {
    setIsProcessing(true)
    const newId = `INC-${Math.floor(Math.random() * 8000) + 1000}`
    const newTicket: Ticket = {
      id: newId,
      title: 'Latência anormal no pipeline de ingestão de voz (Gemini 2.5 Flash)',
      source: 'Webhook Endpoint',
      category: 'AI Pipeline & LLM',
      severity: 'ALTA',
      sla: '30 min (P2)',
      confidence: 97.4,
      assignedTo: 'AI Platform Squad',
      status: 'ANALISANDO',
    }

    setTickets((prev) => [newTicket, ...prev.slice(0, 2)])

    setTimeout(() => {
      setTickets((prev) =>
        prev.map((t) => (t.id === newId ? { ...t, status: 'CLASSIFICADO' } : t))
      )
      setTimeout(() => {
        setTickets((prev) =>
          prev.map((t) => (t.id === newId ? { ...t, status: 'ENCAMINHADO' } : t))
        )
        setIsProcessing(false)
      }, 1000)
    }, 1200)
  }

  const triggerTelemetrySimulation = () => {
    setTonerCyan(8)
    setReplenishDispatched(false)
    setTimeout(() => {
      setReplenishDispatched(true)
    }, 1500)
  }

  return (
    <section className="py-20 md:py-28 relative" id="cases-visuais">
      {/* Glow background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/5 blur-[160px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono text-[10px] uppercase tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <Activity className="w-3 h-3" />
          <span>MOTORES DE PRODUÇÃO EM TEMPO REAL</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-text-primary">
          Sistemas Corporativos{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
            em Ação
          </span>
        </h2>
        <p className="text-sm md:text-base text-text-secondary leading-relaxed max-w-2xl mx-auto">
          Interaja com as nossas esteiras autônomas de produção. Veja como a IA e a telemetria eliminam gargalos manuais em tempo real.
        </p>

        {/* Tab Switcher */}
        <div className="flex justify-center gap-3 pt-6">
          <button
            onClick={() => setActiveTab('itsm')}
            className={`px-5 py-2 rounded-lg font-mono text-xs transition-all flex items-center gap-2 cursor-pointer border ${
              activeTab === 'itsm'
                ? 'bg-blue-600/20 border-cyan-400/50 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.25)] font-bold'
                : 'bg-[#111318] border-white/[0.08] text-text-secondary hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Case 1: ITSM AI Classifier</span>
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`px-5 py-2 rounded-lg font-mono text-xs transition-all flex items-center gap-2 cursor-pointer border ${
              activeTab === 'telemetry'
                ? 'bg-blue-600/20 border-cyan-400/50 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.25)] font-bold'
                : 'bg-[#111318] border-white/[0.08] text-text-secondary hover:text-white'
            }`}
          >
            <Server className="w-4 h-4 text-cyan-400" />
            <span>Case 2: Telemetria Preditiva IoT</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Container */}
      <div className="max-w-6xl mx-auto">
        {activeTab === 'itsm' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
            {/* Left Metrics & Context */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-bold">
                  // GOVERNANÇA & TRIAGEM COGNITIVA
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-text-primary">
                  Classificação de Incidentes com Gemini 2.5 Flash
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Elimine a esteira manual de analistas N1 triando chamados. Nossa IA lê o log de erro, calcula a matriz de impacto x urgência, define o SLA contratual e encaminha ao squad responsável em menos de 1 segundo.
                </p>
              </div>

              {/* Metrics Visual Grid */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 bg-[#0e1015] border-white/[0.08]" hoverEffect={false}>
                  <div className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    &lt; 1.2s
                  </div>
                  <div className="text-[11px] font-mono text-text-secondary uppercase mt-1">
                    Inferência Gemini 2.5 Flash
                  </div>
                </Card>
                <Card className="p-4 bg-[#0e1015] border-white/[0.08]" hoverEffect={false}>
                  <div className="text-2xl md:text-3xl font-extrabold text-cyan-300">
                    JSON Schema
                  </div>
                  <div className="text-[11px] font-mono text-text-secondary uppercase mt-1">
                    Validação Estrita Pydantic
                  </div>
                </Card>
              </div>

              {/* Trigger Button */}
              <button
                onClick={simulateNewTicket}
                disabled={isProcessing}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-110 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all cursor-pointer disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isProcessing ? 'Classificando Incidente via IA...' : 'Simular Ingestão de Novo Incidente'}</span>
              </button>
            </div>

            {/* Right Live Simulation Table */}
            <div className="lg:col-span-7">
              <Card className="p-6 bg-[#0c0e12]/95 border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.1)] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="font-mono text-xs text-white font-bold">Fila de Triagem Cognitiva em Tempo Real</span>
                  </div>
                  <span className="font-mono text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-400/30">
                    SLA ENGINE ACTIVE
                  </span>
                </div>

                <div className="space-y-3">
                  {tickets.map((t) => (
                    <div
                      key={t.id}
                      className="p-4 rounded-lg bg-[#11141a] border border-white/[0.06] hover:border-cyan-500/30 transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-cyan-300">{t.id}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-text-secondary">
                            {t.source}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold ${
                              t.severity === 'CRÍTICA'
                                ? 'bg-rose-500/15 border border-rose-500/30 text-rose-300'
                                : t.severity === 'ALTA'
                                ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
                                : 'bg-blue-500/15 border border-blue-500/30 text-blue-300'
                            }`}
                          >
                            {t.severity}
                          </span>
                          <span className="font-mono text-[10px] text-cyan-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {t.sla}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-text-primary font-medium">{t.title}</p>

                      <div className="flex items-center justify-between pt-2 border-t border-white/[0.04] text-[10px] font-mono text-text-secondary">
                        <div className="flex items-center gap-1.5 text-cyan-400">
                          <Zap className="w-3 h-3" />
                          <span>Squad: <strong>{t.assignedTo}</strong></span>
                        </div>
                        <div className="flex items-center gap-1 text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Confiança IA: {t.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'telemetry' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
            {/* Left Metrics & Context */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-bold">
                  // TELEMETRIA PREDITIVA SNMP
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-text-primary">
                  Gestão & Reposição Autônoma de Insumos
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Monitoramento contínuo de centenas de dispositivos via protocolo SNMP. O sistema projeta a velocidade de esgotamento e dispara a ordem de faturamento no ERP antes que o cliente fique sem toner ou peça.
                </p>
              </div>

              {/* Metrics Visual Grid */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 bg-[#0e1015] border-white/[0.08]" hoverEffect={false}>
                  <div className="text-2xl md:text-3xl font-extrabold text-cyan-400">
                    SNMP v2/v3
                  </div>
                  <div className="text-[11px] font-mono text-text-secondary uppercase mt-1">
                    Protocolo de Coleta
                  </div>
                </Card>
                <Card className="p-4 bg-[#0e1015] border-white/[0.08]" hoverEffect={false}>
                  <div className="text-2xl md:text-3xl font-extrabold text-blue-400">
                    Webhook ERP
                  </div>
                  <div className="text-[11px] font-mono text-text-secondary uppercase mt-1">
                    Disparo Automático de Pedido
                  </div>
                </Card>
              </div>

              {/* Trigger Button */}
              <button
                onClick={triggerTelemetrySimulation}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-110 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Simular Desgaste de Insumo (Alerta Preditivo)</span>
              </button>
            </div>

            {/* Right Live Gauges & Logs */}
            <div className="lg:col-span-7">
              <Card className="p-6 bg-[#0c0e12]/95 border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.1)] space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-cyan-400" />
                    <span className="font-mono text-xs text-white font-bold">Parque Corporativo — Dispositivo #PRN-108</span>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    SNMP POLLER // OK
                  </span>
                </div>

                {/* Visual Level Bars */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* Black */}
                  <div className="p-3 rounded-lg bg-[#11141a] border border-white/[0.06] text-center space-y-2">
                    <div className="text-[11px] font-mono text-text-secondary">Toner Black</div>
                    <div className="h-24 bg-white/[0.04] rounded-lg relative overflow-hidden flex items-end">
                      <div className="w-full bg-zinc-400 transition-all duration-500" style={{ height: '88%' }} />
                    </div>
                    <div className="font-mono text-xs font-bold text-white">88%</div>
                  </div>

                  {/* Cyan (Triggered Alert) */}
                  <div className="p-3 rounded-lg bg-[#11141a] border border-cyan-500/40 text-center space-y-2 relative shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                    <div className="text-[11px] font-mono text-cyan-400 font-bold">Toner Cyan</div>
                    <div className="h-24 bg-white/[0.04] rounded-lg relative overflow-hidden flex items-end">
                      <div
                        className="w-full bg-cyan-400 transition-all duration-500"
                        style={{ height: `${tonerCyan}%` }}
                      />
                    </div>
                    <div className="font-mono text-xs font-bold text-cyan-300">{tonerCyan}%</div>
                    {tonerCyan <= 15 && (
                      <span className="absolute -top-2 right-2 px-1.5 py-0.5 rounded bg-amber-500 text-black text-[9px] font-bold font-mono">
                        ALERTA
                      </span>
                    )}
                  </div>

                  {/* Magenta */}
                  <div className="p-3 rounded-lg bg-[#11141a] border border-white/[0.06] text-center space-y-2">
                    <div className="text-[11px] font-mono text-text-secondary">Toner Magenta</div>
                    <div className="h-24 bg-white/[0.04] rounded-lg relative overflow-hidden flex items-end">
                      <div className="w-full bg-pink-500 transition-all duration-500" style={{ height: '62%' }} />
                    </div>
                    <div className="font-mono text-xs font-bold text-white">62%</div>
                  </div>

                  {/* Yellow */}
                  <div className="p-3 rounded-lg bg-[#11141a] border border-white/[0.06] text-center space-y-2">
                    <div className="text-[11px] font-mono text-text-secondary">Toner Yellow</div>
                    <div className="h-24 bg-white/[0.04] rounded-lg relative overflow-hidden flex items-end">
                      <div className="w-full bg-amber-400 transition-all duration-500" style={{ height: '75%' }} />
                    </div>
                    <div className="font-mono text-xs font-bold text-white">75%</div>
                  </div>
                </div>

                {/* Automated Action Log */}
                <div className="p-4 rounded-lg bg-[#07080a] border border-white/[0.04] font-mono text-[11px] space-y-1.5">
                  <div className="text-text-secondary flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                    <span>&gt; Telemetry Event Log:</span>
                  </div>
                  <p className="text-amber-300">
                    [WARN] PRN-108 Toner Cyan atingiu nível crítico ({tonerCyan}% &lt; 15%).
                  </p>
                  {replenishDispatched ? (
                    <p className="text-emerald-400">
                      [AUTO-DISPATCH] Pedido de reposição #ORD-9842 emitido automaticamente no ERP.
                    </p>
                  ) : (
                    <p className="text-cyan-300 animate-pulse">
                      [CALCULATING] Projeção de esgotamento: 3 dias. Disparando webhook para ERP...
                    </p>
                  )}
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
