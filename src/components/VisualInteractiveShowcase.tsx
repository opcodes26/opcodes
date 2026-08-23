import { useState } from 'react'
import { Card } from './ui/Card'
import {
  FileText,
  Cpu,
  CheckCircle2,
  Activity,
  Play,
  RotateCcw,
  Sparkles,
  Database
} from 'lucide-react'

interface TicketAnalysis {
  id: string
  rawUserText: string
  cleanedDescription: string
  rootCauseCategory: string
  preventiveAction: string
  impactLevel: 'ALTO REINCIDENTE' | 'MÉDIO REINCIDENTE' | 'PONTUAL'
}

const INITIAL_ANALYSIS: TicketAnalysis[] = [
  {
    id: 'CHAMADO-1042',
    rawUserText: '"meu sistema travou dnv na hr de emitir a nota nao sei oq faz socorro"',
    cleanedDescription: 'Timeout no gateway de emissão NF-e por travamento de sessão PostgreSQL.',
    rootCauseCategory: 'Infraestrutura de Banco & Pooler',
    preventiveAction: 'Ajustar timeout de conexão no PgBouncer e adicionar retry automático no client.',
    impactLevel: 'ALTO REINCIDENTE',
  },
  {
    id: 'CHAMADO-0988',
    rawUserText: '"nao consigo logar fala que meu token expirou mas acabei de entrar"',
    cleanedDescription: 'Descompasso de relógio NTP e falta de rotação silenciosa no refresh token JWT.',
    rootCauseCategory: 'Autenticação & Sessão',
    preventiveAction: 'Implementar interceptor com refresh automático de token no frontend antes da expiração.',
    impactLevel: 'ALTO REINCIDENTE',
  },
  {
    id: 'CHAMADO-1120',
    rawUserText: '"tela de relatorio fica branca e nao carrega nada"',
    cleanedDescription: 'Query de agregação sem índice na coluna tenant_id gerando out-of-memory.',
    rootCauseCategory: 'Indexação de Banco de Dados',
    preventiveAction: 'Criar índice composto (tenant_id, created_at) e paginação no backend.',
    impactLevel: 'MÉDIO REINCIDENTE',
  },
]

export function VisualInteractiveShowcase() {
  // ITSM State
  const [analyses, setAnalyses] = useState<TicketAnalysis[]>(INITIAL_ANALYSIS)
  const [activeTab, setActiveTab] = useState<'itsm' | 'invoices'>('itsm')
  const [isProcessing, setIsProcessing] = useState(false)

  // Invoice Extraction State
  const [invoiceProcessed, setInvoiceProcessed] = useState(true)
  const [extractedRows, setExtractedRows] = useState(48)

  const simulateNewTicketCleaning = () => {
    setIsProcessing(true)
    const newId = `CHAMADO-${Math.floor(Math.random() * 8000) + 1000}`
    const newAnalysis: TicketAnalysis = {
      id: newId,
      rawUserText: '"sistema caiu qnd fui salvar o arquivo de novo perdi td"',
      cleanedDescription: 'Falha de upload por falta de tratamento de conexão interrompida no S3/Storage.',
      rootCauseCategory: 'Storage & Upload Pipeline',
      preventiveAction: 'Implementar upload multipart com retry em chunks e validação prévia de tamanho.',
      impactLevel: 'ALTO REINCIDENTE',
    }

    setTimeout(() => {
      setAnalyses((prev) => [newAnalysis, ...prev.slice(0, 2)])
      setIsProcessing(false)
    }, 1200)
  }

  const triggerInvoiceSimulation = () => {
    setInvoiceProcessed(false)
    setTimeout(() => {
      setExtractedRows((prev) => prev + 12)
      setInvoiceProcessed(true)
    }, 1400)
  }

  return (
    <section className="py-20 md:py-28 relative" id="cases-visuais">
      {/* Glow background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/5 blur-[160px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono text-[10px] uppercase tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <Activity className="w-3 h-3" />
          <span>AUTOMAÇÕES OPERACIONAIS B2B & PMEs</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-text-primary">
          Eliminando o Trabalho Manual{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
            de PMEs
          </span>
        </h2>
        <p className="text-sm md:text-base text-text-secondary leading-relaxed max-w-2xl mx-auto">
          Veja na prática como a higienização de dados com IA e a automação de faturas libertam a equipe de tarefas repetitivas e identificam problemas na causa-raiz.
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
            <span>Case 1: Inteligência em Chamados & Causa-Raiz</span>
          </button>
          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-5 py-2 rounded-lg font-mono text-xs transition-all flex items-center gap-2 cursor-pointer border ${
              activeTab === 'invoices'
                ? 'bg-blue-600/20 border-cyan-400/50 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.25)] font-bold'
                : 'bg-[#111318] border-white/[0.08] text-text-secondary hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Case 2: Automação de Faturas & Fim do Excel</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Container */}
      <div className="max-w-6xl mx-auto">
        {activeTab === 'itsm' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
            {/* Left Context */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-bold">
                  // MINERAÇÃO DE DADOS & CAUSA-RAIZ
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-text-primary">
                  Higienização de Chamados e Ação Preventiva
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Os relatos dos usuários chegam desorganizados e sem padrão. Nosso motor utiliza LLM para sanitizar a descrição, mapear o padrão de falha no backend e apontar exatamente a <strong>ação corretiva</strong> que a equipe de TI deve fazer para evitar que novos chamados aconteçam.
                </p>
              </div>

              {/* Metrics Visual Grid */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 bg-[#0e1015] border-white/[0.08]" hoverEffect={false}>
                  <div className="text-xl md:text-2xl font-extrabold text-cyan-400">
                    Prevenção
                  </div>
                  <div className="text-[11px] font-mono text-text-secondary uppercase mt-1">
                    Foco em Causa-Raiz
                  </div>
                </Card>
                <Card className="p-4 bg-[#0e1015] border-white/[0.08]" hoverEffect={false}>
                  <div className="text-xl md:text-2xl font-extrabold text-blue-400">
                    Limpeza NLP
                  </div>
                  <div className="text-[11px] font-mono text-text-secondary uppercase mt-1">
                    Padronização de Texto
                  </div>
                </Card>
              </div>

              {/* Trigger Button */}
              <button
                onClick={simulateNewTicketCleaning}
                disabled={isProcessing}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-110 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all cursor-pointer disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isProcessing ? 'Sanitizando Relato com IA...' : 'Simular Análise de Novo Chamado'}</span>
              </button>
            </div>

            {/* Right Live Simulation Table */}
            <div className="lg:col-span-7">
              <Card className="p-6 bg-[#0c0e12]/95 border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.1)] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="font-mono text-xs text-white font-bold">Diagnóstico de Causa-Raiz de Chamados</span>
                  </div>
                  <span className="font-mono text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-400/30">
                    NLP PIPELINE ACTIVE
                  </span>
                </div>

                <div className="space-y-4">
                  {analyses.map((t) => (
                    <div
                      key={t.id}
                      className="p-4 rounded-lg bg-[#11141a] border border-white/[0.06] hover:border-cyan-500/30 transition-all space-y-3 font-mono text-xs"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="font-bold text-cyan-300">{t.id}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30 font-bold">
                          {t.impactLevel}
                        </span>
                      </div>

                      {/* Raw text */}
                      <div className="p-2 rounded bg-[#07080a] border border-white/[0.04] text-[11px] text-text-secondary">
                        <span className="text-white/40 block text-[9px] uppercase tracking-wider">// Texto Original do Usuário:</span>
                        <p className="italic text-zinc-300 mt-0.5">{t.rawUserText}</p>
                      </div>

                      {/* AI Cleaned & Diagnosed */}
                      <div className="space-y-1 text-[11px]">
                        <div className="text-cyan-300 flex items-start gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5 text-cyan-400" />
                          <span><strong>Diagnóstico Técnico:</strong> {t.cleanedDescription}</span>
                        </div>
                        <div className="text-emerald-400 flex items-start gap-1.5 pl-5 pt-1">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          <span><strong>Ação Preventiva para a TI:</strong> {t.preventiveAction}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'invoices' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
            {/* Left Context */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-bold">
                  // EXTRAÇÃO DE NOTAS & FIM DO EXCEL MANUAL
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-text-primary">
                  Automação de Faturas de Outsourcing
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  A analista recebia dezenas de faturas e notas fiscais de fornecedores e precisava transcrever contadores, páginas impressas e valores manualmente para planilhas. Criamos um pipeline que extrai os dados dos PDFs e concilia os valores automaticamente no banco de dados.
                </p>
              </div>

              {/* Metrics Visual Grid */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 bg-[#0e1015] border-white/[0.08]" hoverEffect={false}>
                  <div className="text-xl md:text-2xl font-extrabold text-cyan-400">
                    0 Digitação
                  </div>
                  <div className="text-[11px] font-mono text-text-secondary uppercase mt-1">
                    Excel Eliminado
                  </div>
                </Card>
                <Card className="p-4 bg-[#0e1015] border-white/[0.08]" hoverEffect={false}>
                  <div className="text-xl md:text-2xl font-extrabold text-blue-400">
                    Conciliação
                  </div>
                  <div className="text-[11px] font-mono text-text-secondary uppercase mt-1">
                    Auditoria Automática
                  </div>
                </Card>
              </div>

              {/* Trigger Button */}
              <button
                onClick={triggerInvoiceSimulation}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-110 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Simular Ingestão e Leitura de Novo Lote de Faturas</span>
              </button>
            </div>

            {/* Right Live Simulation Table */}
            <div className="lg:col-span-7">
              <Card className="p-6 bg-[#0c0e12]/95 border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.1)] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <span className="font-mono text-xs text-white font-bold">Pipeline de Extração de Faturas de Outsourcing</span>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    PDF PARSER // ACTIVE
                  </span>
                </div>

                {/* Simulated Data Extraction Flow */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3.5 rounded-lg bg-[#11141a] border border-white/[0.06] space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-zinc-300 font-bold">fatura_outsourcing_parque_ti_0826.pdf</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Status: Conciliado
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/[0.04] text-[10px] text-text-secondary">
                      <div>
                        <span>Contador Monocromático:</span>
                        <p className="text-white font-bold">142.850 páginas</p>
                      </div>
                      <div>
                        <span>Contador Colorido:</span>
                        <p className="text-white font-bold">38.410 páginas</p>
                      </div>
                      <div>
                        <span>Valor Total Faturado:</span>
                        <p className="text-cyan-300 font-bold">R$ 14.890,50</p>
                      </div>
                    </div>
                  </div>

                  {/* Summary Bar */}
                  <div className="p-4 rounded-lg bg-[#07080a] border border-white/[0.04] space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-text-secondary flex items-center gap-1.5">
                        <Database className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Linhas de faturas conciliadas no banco:</span>
                      </span>
                      <span className="text-cyan-300 font-bold">{extractedRows} registros</span>
                    </div>

                    <div className="text-[10px] text-text-secondary">
                      {invoiceProcessed ? (
                        <span className="text-emerald-400">
                          [CONCILIADO] Divergência entre faturas e contadores físicos: 0% de erro.
                        </span>
                      ) : (
                        <span className="text-cyan-300 animate-pulse">
                          [EXTRAINDO] Lendo PDF de faturas e cruzando com banco de dados...
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
