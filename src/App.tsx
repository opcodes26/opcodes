/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react'
import { Button } from './components/ui/Button'
import { Card } from './components/ui/Card'
import { ContactForm } from './components/ContactForm'
import { HeroTerminal } from './components/HeroTerminal'
import { ProjectShowcase } from './components/ProjectShowcase'
import { VisualInteractiveShowcase } from './components/VisualInteractiveShowcase'
import {
  Terminal as TerminalIcon,
  MessageSquare,
  Boxes,
  Receipt,
  FileSearch,
  Target,
  ChevronRight,
  Sparkles,
  Database,
  ArrowUpRight,
  Play,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react'

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Harmofin Audio Mock Player State
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [audioProgress, setAudioProgress] = useState(0)
  const [harmofinStatus, setHarmofinStatus] = useState<'IDLE' | 'TRANSCRIBING' | 'AI_PARSING' | 'DB_WRITE' | 'SUCCESS'>('IDLE')

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (audioPlaying) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setAudioPlaying(false)
            setHarmofinStatus('AI_PARSING')
            
            // Run following steps
            setTimeout(() => {
              setHarmofinStatus('DB_WRITE')
              setTimeout(() => {
                setHarmofinStatus('SUCCESS')
              }, 1200)
            }, 1000)

            return 100
          }
          return prev + 4
        })
      }, 100)
    } else {
      setAudioProgress(0)
    }
    return () => clearInterval(interval)
  }, [audioPlaying])

  const restartHarmofinDemo = () => {
    setAudioPlaying(true)
    setAudioProgress(0)
    setHarmofinStatus('TRANSCRIBING')
  }

  return (
    <div className="min-h-screen bg-bg-base text-text-primary selection:bg-cyan-500/30 selection:text-cyan-300 overflow-x-hidden antialiased">
      {/* Background Grid Lines Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" 
        style={{ maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)' }}
      />

      {/* Glow Top Left */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />
      {/* Glow Center Right */}
      <div className="absolute top-[40%] right-10 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[140px] pointer-events-none" />

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-bg-base/70 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-mono font-bold text-sm tracking-tight text-white group">
            <span className="bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border border-cyan-400/30 text-cyan-300 px-2.5 py-0.5 rounded text-xs transition-colors group-hover:brightness-125">
              OP Codes
            </span>
            <span className="opacity-90 font-mono text-xs text-text-secondary">// Systems Lab</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#showcase" className="text-xs font-mono uppercase tracking-wider text-cyan-300 hover:text-white transition-colors">
              // Portfólio
            </a>
            <a href="#cases-visuais" className="text-xs font-mono uppercase tracking-wider text-text-secondary hover:text-cyan-300 transition-colors">
              // Motores em Ação
            </a>
            <a href="#case-harmofin" className="text-xs font-mono uppercase tracking-wider text-text-secondary hover:text-text-primary transition-colors">
              // Case Harmofin
            </a>
            <a href="#automacoes" className="text-xs font-mono uppercase tracking-wider text-text-secondary hover:text-text-primary transition-colors">
              // Automações
            </a>
          </nav>

          {/* CTA Navbar */}
          <div className="hidden md:flex items-center">
            <a href="#diagnostico">
              <Button variant="secondary" className="font-mono text-xs border border-white/10 hover:border-accent-mint/30 text-accent-mint hover:bg-[#121417]">
                Consultar Engenharia
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg border border-white/10 text-text-primary cursor-pointer hover:bg-bg-surface"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-white/[0.06] bg-[#0c0d0f]/95 px-6 py-6 space-y-4 font-mono text-xs animate-fade-in">
            <a 
              href="#tecnologias" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              // Tecnologias
            </a>
            <a 
              href="#case-harmofin" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              // Case Harmofin
            </a>
            <a 
              href="#automacoes" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              // Automações
            </a>
            <div className="pt-4 border-t border-white/[0.06]">
              <a 
                href="#diagnostico"
                onClick={() => setMobileMenuOpen(false)}
                className="block"
              >
                <Button variant="primary" className="w-full text-center font-mono py-3">
                  Consultar Engenharia
                </Button>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6">
        
        {/* Hero Section */}
        <section className="py-20 md:py-28 flex flex-col items-center text-center relative">
          {/* Micro Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121417] border border-white/[0.06] mb-8 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-accent-mint" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-text-secondary">
              OP_CODES_ENGINE_ACTIVE // v1.4.0
            </span>
          </div>

          {/* Heading H1 */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-text-primary max-w-4xl leading-[1.1] mb-6 font-sans">
            Sua operação não precisa de mais braços.{' '}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-accent-mint to-accent-cyan">
              Precisa de códigos melhores.
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-accent-mint/30 to-accent-cyan/30 blur-xs" />
            </span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-text-secondary max-w-2xl leading-relaxed mb-10">
            Elimine o copiar-e-colar manual entre planilhas, CRMs e ERPs. Desenvolvemos esteiras de automação e agentes de IA autônomos que integram seu ecossistema e escalam seu backoffice sem inflar sua folha de pagamento.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 z-10">
            <a href="#diagnostico">
              <Button variant="primary" size="lg" className="w-full sm:w-auto px-8 cursor-pointer">
                Iniciar Diagnóstico Técnico
              </Button>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="w-full sm:w-auto flex items-center gap-2 cursor-pointer">
                <TerminalIcon className="w-4 h-4 text-accent-cyan" />
                <span>Ver cases no GitHub</span>
              </Button>
            </a>
          </div>

          {/* Interactive Automation Terminal Component */}
          <div className="w-full max-w-3xl relative z-10">
            <div className="absolute inset-0 bg-accent-mint/5 blur-[80px] -z-10 rounded-full" />
            <HeroTerminal />
          </div>
        </section>

        <hr className="border-white/[0.04] my-12" id="tecnologias" />

        {/* Section: Technologies Mini Bar */}
        <section className="py-8 text-center max-w-5xl mx-auto">
          <p className="font-mono text-[10px] text-text-secondary uppercase tracking-widest mb-6">// TECNOLOGIAS NATIVAS INTEGRADAS</p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-40 hover:opacity-75 transition-opacity duration-300">
            <span className="font-sans font-bold tracking-tight text-white flex items-center gap-2 text-sm">
              <Database className="w-4 h-4 text-accent-mint" /> PostgreSQL
            </span>
            <span className="font-sans font-bold tracking-tight text-white flex items-center gap-2 text-sm">
              <Sparkles className="w-4 h-4 text-accent-cyan" /> Gemini 2.5 Flash
            </span>
            <span className="font-sans font-bold tracking-tight text-white flex items-center gap-2 text-sm">
              <Layers className="w-4 h-4 text-purple-400" /> n8n Workflows
            </span>
            <span className="font-sans font-bold tracking-tight text-white flex items-center gap-2 text-sm">
              <MessageSquare className="w-4 h-4 text-emerald-400" /> WhatsApp Cloud API
            </span>
            <span className="font-sans font-bold tracking-tight text-white flex items-center gap-2 text-sm">
              <Receipt className="w-4 h-4 text-amber-400" /> ERP & Bling Integration
            </span>
          </div>
        </section>

        <hr className="border-white/[0.04] my-12" />

        {/* Section: Dynamic Project Showcase & Live Portfolio */}
        <ProjectShowcase />

        <hr className="border-white/[0.04] my-12" />

        {/* Section: Interactive Visual Motors (ITSM & Telemetry) */}
        <VisualInteractiveShowcase />

        <hr className="border-white/[0.04] my-12" />

        {/* Case Harmofin Section */}
        <section className="py-16 md:py-24" id="case-harmofin">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Text Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="font-mono text-xs text-accent-mint tracking-widest uppercase flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-accent-mint/10 border border-accent-mint/20 text-[10px]">
                  CASE STUDY
                </span>
                <span>// SAAS PRÓPRIO</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary leading-tight">
                Harmofin: Como eliminamos 100% dos desvios de estoque de injetáveis de alto custo.
              </h2>
              
              <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                Clínicas de Harmonização Orofacial (HOF) sofrem diariamente com desperdício silencioso. Materiais de alto valor como toxina botulínica e bioestimuladores de colágeno são perdidos por falta de rastreabilidade exata de mililitros, frascos e lotes usados em cada procedimento.
              </p>
              
              <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                Para resolver este gargalo, projetamos do zero o <strong className="text-text-primary font-semibold">Harmofin</strong>: uma plataforma SaaS estruturada sobre um banco de dados relacional robusto (<strong className="text-accent-cyan">PostgreSQL</strong>) e integrada com inteligência artificial. O profissional não precisa preencher relatórios manuais complexos: basta enviar um áudio de 15 segundos relatando o atendimento no inbox.
              </p>
              
              <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                Nossa Cloud Function com <strong className="text-accent-cyan">Gemini 2.5 Flash</strong> interpreta a voz, mapeia o consumo de ml/lote do estoque, cria a ficha do cliente, agenda o retorno e dá baixa automática no banco. Segurança jurídica, conformidade ANVISA/LGPD e controle total de insumos em tempo real.
              </p>

              {/* Metrics Grid (Bento Layout style inside case) */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <Card className="p-4" hoverEffect={false}>
                  <div className="text-2xl md:text-3xl font-extrabold text-accent-mint">100%</div>
                  <div className="text-[11px] font-mono text-text-secondary uppercase tracking-wider mt-1">
                    Controle de estoque de injetáveis
                  </div>
                </Card>
                <Card className="p-4" hoverEffect={false}>
                  <div className="text-2xl md:text-3xl font-extrabold text-accent-mint">0%</div>
                  <div className="text-[11px] font-mono text-text-secondary uppercase tracking-wider mt-1">
                    Digitação manual de prontuários
                  </div>
                </Card>
                <Card className="p-4" hoverEffect={false}>
                  <div className="text-2xl md:text-3xl font-extrabold text-accent-cyan">15 seg</div>
                  <div className="text-[11px] font-mono text-text-secondary uppercase tracking-wider mt-1">
                    Para registrar atendimento completo
                  </div>
                </Card>
                <Card className="p-4" hoverEffect={false}>
                  <div className="text-lg md:text-xl font-bold text-accent-cyan flex items-center gap-1.5 mt-1">
                    <ShieldCheck className="w-5 h-5 text-accent-cyan" />
                    <span>RLS + Claims</span>
                  </div>
                  <div className="text-[11px] font-mono text-text-secondary uppercase tracking-wider mt-1">
                    Segurança ANVISA/LGPD ativa
                  </div>
                </Card>
              </div>
            </div>

            {/* Right Column: Audio intake visualization */}
            <div className="lg:col-span-6">
              <Card className="p-6 border border-white/[0.08]" glow glowColor="cyan">
                {/* Visual Audio Intake Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent-cyan animate-pulse" />
                    <span className="font-mono text-xs text-text-secondary uppercase tracking-wider">
                      Harmofin Voice Intake Pipeline
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-text-secondary opacity-60">Status: {harmofinStatus}</span>
                </div>

                {/* Simulated Audio Player Box */}
                <div className="bg-[#08090A] border border-white/[0.04] rounded-lg p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={restartHarmofinDemo}
                        disabled={audioPlaying}
                        className={`w-10 h-10 rounded-full flex items-center justify-center border cursor-pointer transition-all ${
                          audioPlaying
                            ? 'bg-accent-cyan/10 border-accent-cyan/30 text-accent-cyan'
                            : 'bg-accent-cyan text-bg-base border-transparent hover:scale-105 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                        }`}
                      >
                        {audioPlaying ? (
                          <span className="flex gap-0.5 items-center justify-center">
                            <span className="w-1 h-3 bg-accent-cyan animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <span className="w-1 h-4 bg-accent-cyan animate-bounce" style={{ animationDelay: '0.2s' }} />
                            <span className="w-1 h-2 bg-accent-cyan animate-bounce" style={{ animationDelay: '0.3s' }} />
                          </span>
                        ) : (
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        )}
                      </button>
                      <div>
                        <div className="text-xs font-mono font-bold text-text-primary">atendimento_clinica_248.wav</div>
                        <div className="text-[10px] font-mono text-text-secondary opacity-50">15.4 segundos // Gravador HOF Inbox</div>
                      </div>
                    </div>
                    
                    {/* Simulated Waveform Visual */}
                    <div className="flex items-center gap-0.5 h-6">
                      {[6, 12, 18, 14, 8, 16, 22, 10, 4, 12, 18, 14, 8, 16, 12, 6].map((h, i) => (
                        <div
                          key={i}
                          className={`w-1 rounded-full transition-all duration-200 ${
                            audioPlaying ? 'bg-accent-cyan animate-pulse' : 'bg-white/10'
                          }`}
                          style={{ height: audioPlaying ? `${h}px` : '4px', animationDelay: `${i * 0.05}s` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Audio Progress Bar */}
                  <div className="space-y-1">
                    <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent-cyan transition-all duration-100" 
                        style={{ width: `${audioProgress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[9px] font-mono text-text-secondary opacity-60">
                      <span>0:00</span>
                      <span>0:15</span>
                    </div>
                  </div>
                </div>

                {/* Pipeline Progression Logs */}
                <div className="mt-6 space-y-3 font-mono text-xs">
                  {/* Step 1: Audio ingestion */}
                  <div className={`flex items-start gap-3 p-2.5 rounded border transition-all ${
                    harmofinStatus === 'TRANSCRIBING' 
                      ? 'bg-accent-cyan/5 border-accent-cyan/30 text-accent-cyan' 
                      : harmofinStatus !== 'IDLE' 
                        ? 'border-white/[0.04] opacity-50 text-text-secondary' 
                        : 'border-white/[0.04] text-text-secondary'
                  }`}>
                    <div className="w-5 h-5 rounded bg-white/[0.04] flex items-center justify-center shrink-0 mt-0.5">1</div>
                    <div>
                      <div className="font-bold">Ingestão & Transcrição de Voz</div>
                      <div className="text-[10px] opacity-85 mt-0.5">Captura do áudio, envio do buffer WAV e parsing via Whisper API.</div>
                      {audioPlaying && <div className="text-[10px] text-accent-cyan mt-1 animate-pulse">&gt; Transcrevendo áudio... {audioProgress}%</div>}
                    </div>
                  </div>

                  {/* Step 2: LLM interpretation */}
                  <div className={`flex items-start gap-3 p-2.5 rounded border transition-all ${
                    harmofinStatus === 'AI_PARSING' 
                      ? 'bg-accent-cyan/5 border-accent-cyan/30 text-accent-cyan' 
                      : ['DB_WRITE', 'SUCCESS'].includes(harmofinStatus) 
                        ? 'border-white/[0.04] opacity-50 text-text-secondary' 
                        : 'border-white/[0.04] text-text-secondary'
                  }`}>
                    <div className="w-5 h-5 rounded bg-white/[0.04] flex items-center justify-center shrink-0 mt-0.5">2</div>
                    <div>
                      <div className="font-bold">Interpretação Cognitiva (Gemini 2.5 Flash)</div>
                      <div className="text-[10px] opacity-85 mt-0.5">Extração estruturada de ml consumido, frascos e lote do estoque.</div>
                      {harmofinStatus === 'AI_PARSING' && (
                        <div className="text-[10px] text-accent-cyan mt-1.5 p-2 bg-[#08090A] border border-white/[0.06] rounded">
                          &gt; Gemini output: <br/>
                          <span className="text-amber-300">&#123; paciente: "Ana Paula S.", ml: 0.8, item: "Toxina", lote: "B42" &#125;</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Step 3: Database write */}
                  <div className={`flex items-start gap-3 p-2.5 rounded border transition-all ${
                    harmofinStatus === 'DB_WRITE' 
                      ? 'bg-accent-cyan/5 border-accent-cyan/30 text-accent-cyan' 
                      : harmofinStatus === 'SUCCESS' 
                        ? 'border-white/[0.04] opacity-50 text-text-secondary' 
                        : 'border-white/[0.04] text-text-secondary'
                  }`}>
                    <div className="w-5 h-5 rounded bg-white/[0.04] flex items-center justify-center shrink-0 mt-0.5">3</div>
                    <div>
                      <div className="font-bold">Baixa no PostgreSQL & RLS checks</div>
                      <div className="text-[10px] opacity-85 mt-0.5">Verificação de permissão RLS e débito físico exato de insumos.</div>
                      {harmofinStatus === 'DB_WRITE' && <div className="text-[10px] text-accent-cyan mt-1 animate-pulse">&gt; EXECUTING TRANSACTION: UPDATE stock WHERE lot='B42'</div>}
                    </div>
                  </div>

                  {/* Step 4: Success confirmation */}
                  <div className={`flex items-start gap-3 p-2.5 rounded border transition-all ${
                    harmofinStatus === 'SUCCESS' 
                      ? 'bg-accent-mint/5 border-accent-mint/30 text-accent-mint' 
                      : 'border-white/[0.04] text-text-secondary'
                  }`}>
                    <div className="w-5 h-5 rounded bg-white/[0.04] flex items-center justify-center shrink-0 mt-0.5">
                      {harmofinStatus === 'SUCCESS' ? <CheckCircle2 className="w-3.5 h-3.5 text-accent-mint" /> : 4}
                    </div>
                    <div>
                      <div className="font-bold">Sucesso de pipeline</div>
                      <div className="text-[10px] opacity-85 mt-0.5">Agendamento de retorno, baixa do frasco e prontuário salvo.</div>
                      {harmofinStatus === 'SUCCESS' && (
                        <div className="text-[10px] text-accent-mint mt-1">
                          [OK] Estoque sincronizado. Retorno agendado para 15 dias.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Simulated Wave Trigger CTA */}
                {!audioPlaying && harmofinStatus !== 'TRANSCRIBING' && (
                  <button
                    onClick={restartHarmofinDemo}
                    className="mt-6 w-full py-2.5 border border-white/[0.08] hover:border-accent-cyan/30 text-xs font-mono text-text-primary rounded-lg flex items-center justify-center gap-2 hover:bg-[#1A1D22] transition-all cursor-pointer"
                  >
                    <Play className="w-3 h-3 text-accent-cyan" />
                    <span>Disparar Fluxo de Demonstração</span>
                  </button>
                )}
              </Card>
            </div>
            
          </div>
        </section>

        <hr className="border-white/[0.04] my-12" />

        {/* Bento Grid Automações Section */}
        <section className="py-16 md:py-24" id="automacoes">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="font-mono text-xs text-accent-cyan tracking-widest uppercase">// SOLUÇÕES & FLUXOS</div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
              Infraestrutura operacional sob medida para a sua escala.
            </h2>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed">
              Não instalamos soluções prontas. Mapeamos seus fluxos manuais mais caros e programamos conexões nativas entre seus sistemas favoritos.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: WhatsApp Conversacional (Width: 2 cols, Height: 2 lines) */}
            <Card 
              className="lg:col-span-2 lg:row-span-2 p-6 flex flex-col justify-between border border-white/[0.08] group" 
              glow 
              glowColor="mint"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[10px] text-accent-mint tracking-wider uppercase border border-accent-mint/20 bg-accent-mint/5 px-2 py-0.5 rounded">
                    INTEGRAÇÃO // WHATSAPP + IA
                  </div>
                  <MessageSquare className="w-5 h-5 text-accent-mint" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-text-primary">
                    Atendimento Inteligente 24 horas por dia.
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Agentes treinados com o contexto real dos seus serviços qualificam leads frios, consultam a agenda de forma dinâmica e efetuam o agendamento de reuniões diretamente no seu CRM. Chega de deixar clientes esperando no fim de semana.
                  </p>
                </div>
              </div>

              {/* Visual Chat Sim */}
              <div className="mt-8 bg-[#08090A] border border-white/[0.04] rounded-lg p-4 font-mono text-[11px] space-y-3.5">
                <div className="flex items-start gap-2">
                  <span className="text-text-secondary shrink-0">[Cliente]:</span>
                  <span className="text-text-primary">"Gostaria de agendar um horário para terça"</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent-mint shrink-0">[Agent AI]:</span>
                  <div className="space-y-1">
                    <span className="text-accent-mint">"Acessando agenda... Horários disponíveis na terça-feira:"</span>
                    <div className="flex gap-2 pt-1">
                      <span className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08]">14:00</span>
                      <span className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08]">16:00</span>
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-white/[0.04] text-[10px] text-accent-cyan flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5" />
                  <span>&gt; Sincronizando com HubSpot CRM + Google Calendar...</span>
                </div>
              </div>
            </Card>

            {/* Card 2: Orquestração e Sincronização (Width: 1 col, Height: 2 lines) */}
            <Card 
              className="lg:col-span-1 lg:row-span-2 p-6 flex flex-col justify-between border border-white/[0.08] group" 
              glow 
              glowColor="cyan"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[10px] text-accent-cyan tracking-wider uppercase border border-accent-cyan/20 bg-accent-cyan/5 px-2 py-0.5 rounded">
                    INFRA // N8N WORKFLOWS
                  </div>
                  <Boxes className="w-5 h-5 text-accent-cyan" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-text-primary">
                    O coração operacional do seu negócio.
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Sincronizamos seus sistemas de vendas (HubSpot, Pipedrive, ActiveCampaign) aos seus sistemas de operação interna e finanças (Bling, Omie, Tiny). Os dados fluem de forma bidirecional sem necessidade de intervenção humana.
                  </p>
                </div>
              </div>

              {/* Visual Node Flows */}
              <div className="mt-8 bg-[#08090A] border border-white/[0.04] rounded-lg p-5 font-mono text-[10px] space-y-4">
                <div className="flex justify-between items-center relative">
                  {/* Connecting Line */}
                  <div className="absolute left-6 right-6 top-1/2 h-[1px] bg-gradient-to-r from-accent-cyan to-purple-500 -translate-y-1/2 -z-10 animate-pulse" />
                  
                  <div className="p-2 rounded bg-[#121417] border border-white/[0.08] text-center z-10">
                    <div className="font-bold text-text-primary text-[9px]">CRMs</div>
                    <span className="text-accent-cyan">HubSpot</span>
                  </div>

                  <div className="p-1.5 rounded-full bg-accent-cyan/15 border border-accent-cyan/30 text-accent-cyan z-10 animate-bounce">
                    <ChevronRight className="w-4 h-4" />
                  </div>

                  <div className="p-2 rounded bg-[#121417] border border-white/[0.08] text-center z-10">
                    <div className="font-bold text-text-primary text-[9px]">n8n Node</div>
                    <span className="text-purple-400">Router</span>
                  </div>

                  <div className="p-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 z-10">
                    <ChevronRight className="w-4 h-4" />
                  </div>

                  <div className="p-2 rounded bg-[#121417] border border-white/[0.08] text-center z-10">
                    <div className="font-bold text-text-primary text-[9px]">ERPs</div>
                    <span className="text-amber-400">Bling</span>
                  </div>
                </div>
                <div className="text-[9px] text-text-secondary text-center">
                  Sincronização bidirecional garantida em 100% dos eventos.
                </div>
              </div>
            </Card>

            {/* Card 3: Faturamento Automático (Width: 1 col, Height: 1 line) */}
            <Card className="p-6 flex flex-col justify-between border border-white/[0.08] group" glow>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[10px] text-text-secondary tracking-wider uppercase border border-white/[0.08] bg-white/[0.02] px-2 py-0.5 rounded">
                    MÉTRICA // FINANÇAS
                  </div>
                  <Receipt className="w-4.5 h-4.5 text-text-secondary" />
                </div>
                <h3 className="text-base font-bold text-text-primary">
                  Notas fiscais e cobranças automáticas.
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Seu financeiro livre de tarefas repetitivas. Integração automática com sistemas de emissão fiscal. Assim que o pagamento é aprovado, a nota é emitida pelo ERP, anexada ao contrato e enviada ao cliente por e-mail ou WhatsApp.
                </p>
              </div>
            </Card>

            {/* Card 4: RAG Knowledge Assistant (Width: 1 col, Height: 1 line) */}
            <Card className="p-6 flex flex-col justify-between border border-white/[0.08] group" glow>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[10px] text-accent-cyan tracking-wider uppercase border border-accent-cyan/20 bg-accent-cyan/5 px-2 py-0.5 rounded">
                    TECNOLOGIA // RAG ASSISTANT
                  </div>
                  <FileSearch className="w-4.5 h-4.5 text-accent-cyan" />
                </div>
                <h3 className="text-base font-bold text-text-primary">
                  Sua base de conhecimento pesquisável.
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Permita que seu time ou clientes consultem contratos complexos, políticas de compliance internas, manuais de produtos ou PDFs regulatórios usando linguagem natural. Respostas baseadas em fontes oficiais com citação de documentos.
                </p>
              </div>
            </Card>

            {/* Card 5: SDR Multi-Agentes de Prospecção (Width: 1 col, Height: 1 line) */}
            <Card className="p-6 flex flex-col justify-between border border-white/[0.08] group" glow>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[10px] text-accent-mint tracking-wider uppercase border border-accent-mint/20 bg-accent-mint/5 px-2 py-0.5 rounded">
                    AGENTES AUTÔNOMOS
                  </div>
                  <Target className="w-4.5 h-4.5 text-accent-mint" />
                </div>
                <h3 className="text-base font-bold text-text-primary">
                  Prospecção inteligente em segundo plano.
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Robôs programados para varrer fontes de leads, filtrar por fit demográfico, enriquecer contatos com e-mails/telefones corporativos e pontuar oportunidades (Lead Scoring) antes do primeiro contato humano.
                </p>
              </div>
            </Card>

          </div>
        </section>

        <hr className="border-white/[0.04] my-12" />

        {/* Diagnosis / Contact Section */}
        <section className="py-16 md:py-24" id="diagnostico">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left side: Context details & Instructions */}
            <div className="lg:col-span-5 space-y-6">
              <div className="font-mono text-xs text-accent-mint tracking-widest uppercase">
                // DIAGNÓSTICO GRATUITO
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary leading-tight">
                Chega de gargalos operacionais. <span className="text-accent-mint">Desenhe seu sistema.</span>
              </h2>
              
              <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                Fale diretamente com nossa equipe de engenharia. Analisamos seus processos manuais atuais e sugerimos uma arquitetura de integração sem compromisso.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent-mint/15 flex items-center justify-center text-accent-mint shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-mono text-text-secondary">Retorno técnico em até 24 horas</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent-mint/15 flex items-center justify-center text-accent-mint shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-mono text-text-secondary">Análise detalhada de gargalos de processos</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent-mint/15 flex items-center justify-center text-accent-mint shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-mono text-text-secondary">Garantia total de confidencialidade (NDA)</span>
                </div>
              </div>

              {/* Terminal-like output on the left */}
              <div className="bg-[#121417]/40 border border-white/[0.04] rounded-lg p-5 font-mono text-xs text-text-secondary space-y-1">
                <p className="text-accent-cyan">// OP Codes SLA</p>
                <p>response_time: &lt; 24h</p>
                <p>engineers_assigned: 2</p>
                <p>deliverables: ["Diagrama de Arquitetura", "Estimativa de Investimento"]</p>
              </div>
            </div>

            {/* Right side: Contact Form Terminal */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-[#0c0d0f] py-12 mt-20 relative z-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="font-mono font-bold text-sm tracking-tight text-white">
              <span className="text-accent-mint">[OP Codes]</span> Software House
            </div>
            <p className="text-xs text-text-secondary max-w-sm">
              Software robusto. Processos inteligentes. Escala real.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 font-mono text-xs">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5">
              <span>Repositórios & Cases</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5">
              <span>Acompanhe nossa Engenharia</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
              Política de Privacidade & LGPD
            </a>
          </div>
        </div>

        <div className="container mx-auto px-6 pt-8 mt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[10px] font-mono text-text-secondary opacity-65">
            © 2026 OP Codes. Todos os direitos reservados.
          </span>
          <span className="text-[10px] font-mono text-text-secondary opacity-65 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-mint" />
            <span>Projetado para máxima performance.</span>
          </span>
        </div>
      </footer>
    </div>
  )
}
