import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSubmitProposal, proposalSchema, type ProposalInput } from '../hooks/useSubmitProposal'
import { Button } from './ui/Button'
import { Terminal, Check, AlertCircle, Loader2, Play } from 'lucide-react'

export function ContactForm() {
  const { submitProposal, isPending, error, isSuccess } = useSubmitProposal()
  const [terminalLogs, setTerminalLogs] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ProposalInput>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      process: undefined,
      description: '',
    },
  })

  const formValues = watch()

  // Terminal log simulation during submission
  useEffect(() => {
    if (isPending) {
      setTerminalLogs([])
      const logs = [
        '> Iniciar compilation: diagnostic_payload.json',
        '> Validando schema via Zod...',
        '> Parsing campos obrigatórios...',
        `> Cliente detectado: "${formValues.name || 'Anonymous'}"`,
        `> Conexão com empresa: "${formValues.company || 'N/A'}"`,
        `> Processo selecionado: "${formValues.process || 'N/A'}"`,
        '> Estabelecendo túnel SSH seguro...',
        '> Gravando proposta no PostgreSQL relacional...',
        '> Disparando webhook para orquestrador n8n...',
        '> Executando análise cognitiva com Gemini 2.5 Flash...',
        '> STATUS: 200 SUCCESS - Processo finalizado com sucesso!'
      ]

      let idx = 0
      const interval = setInterval(() => {
        if (idx < logs.length) {
          setTerminalLogs((prevLogs) => [...prevLogs, logs[idx]])
          idx++
        } else {
          clearInterval(interval)
        }
      }, 180)

      return () => clearInterval(interval)
    }
  }, [isPending, formValues.name, formValues.company, formValues.process])

  const onSubmit = async (data: ProposalInput) => {
    await submitProposal(data)
  }

  // Handle success state and allow starting over
  const handleReset = () => {
    reset()
    setTerminalLogs([])
  }

  return (
    <div className="relative w-full rounded-xl border border-white/[0.08] bg-[#121417]/80 backdrop-blur-[12px] overflow-hidden shadow-2xl">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-[#0c0d0f]/90">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="text-xs font-mono text-text-secondary ml-2 select-none">diagnostico_request.sh</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.04]">
          <Terminal className="w-3.5 h-3.5 text-accent-mint" />
          <span className="text-[10px] font-mono text-accent-mint font-bold uppercase tracking-wider">sh console</span>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {/* Success Screen */}
        {isSuccess && !isPending && (
          <div className="space-y-6 py-8 flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-accent-mint/10 border border-accent-mint/30 flex items-center justify-center text-accent-mint shadow-[0_0_20px_rgba(16,185,129,0.15)]">
              <Check className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-text-primary font-sans">Compilação Concluída</h3>
              <p className="text-sm text-text-secondary max-w-sm">
                Seus dados técnicos foram processados e enviados para a engenharia. Em breve entraremos em contato.
              </p>
            </div>

            <div className="w-full max-w-md bg-[#08090A] border border-white/[0.06] rounded-lg p-4 text-left font-mono text-xs text-accent-mint space-y-1">
              <p className="text-text-secondary">&gt; tail -n 3 /var/log/diagnosticos.log</p>
              <p>[INFO] payload_status=DELIVERED</p>
              <p>[INFO] integration_pipeline=STABLE</p>
              <p>[INFO] contact_schedule=READY</p>
            </div>

            <Button onClick={handleReset} variant="secondary" size="default">
              Enviar novo diagnóstico
            </Button>
          </div>
        )}

        {/* Loading Overlay with Compiling Code Terminal */}
        {isPending && (
          <div className="min-h-[400px] flex flex-col justify-between font-mono text-xs bg-[#08090A] border border-white/[0.06] rounded-lg p-5">
            <div className="space-y-2 flex-grow overflow-y-auto max-h-[320px] scrollbar-thin">
              {terminalLogs.map((log, idx) => (
                <div key={idx} className={`${idx === terminalLogs.length - 1 ? 'text-accent-mint' : 'text-text-secondary'} animate-fade-in`} { ... (idx === terminalLogs.length - 1 ? { "aria-current": "step" } : {}) }>
                  {log}
                </div>
              ))}
              <div className="flex items-center gap-1.5 text-accent-cyan animate-pulse">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>compiling...</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-text-secondary flex justify-between text-[10px]">
              <span>PID: {Math.floor(Math.random() * 9000) + 1000}</span>
              <span>ESTEIRA DE AUTOMAÇÃO OP CODES</span>
            </div>
          </div>
        )}

        {/* Actual Form */}
        {!isPending && !isSuccess && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="flex items-start gap-2.5 p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Nome Completo */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-xs font-mono text-text-secondary">
                  const nomeCompleto =
                </label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    {...register('name')}
                    placeholder='"Digite seu nome"'
                    className={`w-full px-3.5 py-2.5 font-mono text-sm bg-[#08090A] border rounded-lg text-text-primary placeholder-white/20 transition-all duration-200 focus:outline-none focus:border-accent-mint focus:ring-1 focus:ring-accent-mint/20 ${
                      errors.name ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/20' : 'border-white/[0.08]'
                    }`}
                  />
                </div>
                {errors.name && (
                  <span className="block text-[11px] font-mono text-rose-400 mt-1">&gt; Error: {errors.name.message}</span>
                )}
              </div>

              {/* Nome da Empresa */}
              <div className="space-y-1.5">
                <label htmlFor="company" className="block text-xs font-mono text-text-secondary">
                  const nomeEmpresa =
                </label>
                <div className="relative">
                  <input
                    id="company"
                    type="text"
                    {...register('company')}
                    placeholder='"Sua Empresa S.A."'
                    className={`w-full px-3.5 py-2.5 font-mono text-sm bg-[#08090A] border rounded-lg text-text-primary placeholder-white/20 transition-all duration-200 focus:outline-none focus:border-accent-mint focus:ring-1 focus:ring-accent-mint/20 ${
                      errors.company ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/20' : 'border-white/[0.08]'
                    }`}
                  />
                </div>
                {errors.company && (
                  <span className="block text-[11px] font-mono text-rose-400 mt-1">&gt; Error: {errors.company.message}</span>
                )}
              </div>
            </div>

            {/* E-mail Corporativo */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-mono text-text-secondary">
                const emailCorporativo =
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder='"voce@empresa.com.br"'
                  className={`w-full px-3.5 py-2.5 font-mono text-sm bg-[#08090A] border rounded-lg text-text-primary placeholder-white/20 transition-all duration-200 focus:outline-none focus:border-accent-mint focus:ring-1 focus:ring-accent-mint/20 ${
                    errors.email ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/20' : 'border-white/[0.08]'
                  }`}
                />
              </div>
              {errors.email && (
                <span className="block text-[11px] font-mono text-rose-400 mt-1">&gt; Error: {errors.email.message}</span>
              )}
            </div>

            {/* Processo crítico select */}
            <div className="space-y-1.5">
              <label htmlFor="process" className="block text-xs font-mono text-text-secondary">
                const processoCritico =
              </label>
              <div className="relative">
                <select
                  id="process"
                  {...register('process')}
                  className={`w-full px-3.5 py-2.5 font-mono text-sm bg-[#08090A] border rounded-lg text-text-primary transition-all duration-200 focus:outline-none focus:border-accent-mint focus:ring-1 focus:ring-accent-mint/20 ${
                    errors.process ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/20' : 'border-white/[0.08]'
                  }`}
                >
                  <option value="" disabled className="text-white/25">-- Selecionar Processo --</option>
                  <option value="Vendas e Entrada de Leads (CRM/WhatsApp)">Vendas e Entrada de Leads (CRM/WhatsApp)</option>
                  <option value="Faturamento e Emissão Fiscal (NF-e/ERP)">Faturamento e Emissão Fiscal (NF-e/ERP)</option>
                  <option value="Integração Geral de Sistemas e Planilhas">Integração Geral de Sistemas e Planilhas</option>
                  <option value="Assistente de IA / RAG sobre Documentos">Assistente de IA / RAG sobre Documentos</option>
                  <option value="Outro processo manual sob medida">Outro processo manual sob medida</option>
                </select>
              </div>
              {errors.process && (
                <span className="block text-[11px] font-mono text-rose-400 mt-1">&gt; Error: {errors.process.message}</span>
              )}
            </div>

            {/* Descrição / Gargalos */}
            <div className="space-y-1.5">
              <label htmlFor="description" className="block text-xs font-mono text-text-secondary">
                const relatoGargalos =
              </label>
              <div className="relative">
                <textarea
                  id="description"
                  {...register('description')}
                  rows={4}
                  placeholder='`Ex: Perco 2 horas por dia copiando dados de vendas do WhatsApp para o Bling e gerando notas manuais no emissor da prefeitura...`'
                  className={`w-full px-3.5 py-2.5 font-mono text-sm bg-[#08090A] border rounded-lg text-text-primary placeholder-white/20 transition-all duration-200 focus:outline-none focus:border-accent-mint focus:ring-1 focus:ring-accent-mint/20 resize-none ${
                    errors.description ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/20' : 'border-white/[0.08]'
                  }`}
                />
              </div>
              {errors.description && (
                <span className="block text-[11px] font-mono text-rose-400 mt-1">&gt; Error: {errors.description.message}</span>
              )}
            </div>

            {/* LGPD Consent */}
            <p className="text-[10px] text-text-secondary font-mono leading-relaxed opacity-60">
              // Ao enviar, você concorda em compartilhar estes dados técnicos para fins de contato comercial e diagnóstico gratuito. Seus dados estão protegidos sob nossa política de governança.
            </p>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full flex items-center justify-center gap-2 group font-mono font-bold tracking-wide cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current transition-transform duration-200 group-hover:translate-x-0.5" />
              <span>Executar Diagnóstico Técnico -&gt;</span>
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
