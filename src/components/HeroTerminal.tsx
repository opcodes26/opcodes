import { useState, useEffect } from 'react'
import { Play, RotateCcw } from 'lucide-react'

const steps = [
  { text: 'Booting OP Codes Workflow Engine v1.4.0...', type: 'info' },
  { text: 'Connecting API endpoints [n8n orquestrador]...', type: 'info' },
  { text: 'Database: PostgreSQL connection active (RLS enabled)', type: 'db' },
  { text: 'Agent AI: Gemini 2.5 Flash LLM ready', type: 'ai' },
  { text: '--> Event trigger: WhatsApp audio received (15s)', type: 'trigger' },
  { text: '--> Transcribing audio brief...', type: 'ai' },
  { text: '--> Gemini extracted: "Baixa de 1 frasco de Botox, lote B42"', type: 'ai' },
  { text: '--> PostgreSQL: UPDATE stock SET qty = qty - 1 WHERE item = "Botox" AND lot = "B42"', type: 'db' },
  { text: '--> ERP Bling: Syncing stock inventory data...', type: 'sync' },
  { text: '--> Invoice: Creating NF-e transaction reference...', type: 'sync' },
  { text: '--> WhatsApp: Status notification sent to manager', type: 'whatsapp' },
  { text: 'STATUS: SUCCESS - Stock reconciled in 1.45 seconds.', type: 'success' }
]

export function HeroTerminal() {
  const [isRunning, setIsRunning] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)

  const runSimulation = () => {
    setIsRunning(true)
    setLogs([])
    setCurrentLine(0)
  }

  useEffect(() => {
    if (isRunning && currentLine < steps.length) {
      const timeout = setTimeout(() => {
        setLogs((prev) => [...prev, steps[currentLine].text])
        setCurrentLine((prev) => prev + 1)
      }, 550)
      return () => clearTimeout(timeout)
    } else if (currentLine === steps.length) {
      const timeout = setTimeout(() => {
        setIsRunning(false)
      }, 0)
      return () => clearTimeout(timeout)
    }
  }, [isRunning, currentLine])

  return (
    <div className="relative w-full max-w-2xl mx-auto rounded-xl border border-white/[0.08] bg-[#0c0d11]/90 shadow-[0_0_50px_rgba(6,182,212,0.1)] overflow-hidden font-mono text-xs text-text-secondary select-none">
      {/* Glow highlight behind terminal */}
      <div className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-white/[0.06] bg-[#08090c]/90">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-500/60" />
          <span className="text-[10px] text-text-secondary font-mono ml-2 truncate max-w-[120px] sm:max-w-none">opcodes_workflow.py</span>
        </div>
        <div className="flex items-center gap-2">
          {logs.length > 0 && !isRunning && (
            <button
              onClick={runSimulation}
              className="flex items-center gap-1 px-2 py-0.5 rounded border border-white/[0.08] hover:border-cyan-400/40 hover:text-cyan-300 text-[10px] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Reset</span>
            </button>
          )}
          <button
            onClick={runSimulation}
            disabled={isRunning}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-[10px] transition-all cursor-pointer ${
              isRunning
                ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]'
            }`}
          >
            <Play className="w-2.5 h-2.5 fill-current" />
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>
        </div>
      </div>

      {/* Code Editor Content */}
      <div className="p-4 sm:p-5 min-h-[280px] sm:min-h-[320px] max-h-[380px] overflow-y-auto space-y-3 scrollbar-thin text-left">
        {logs.length === 0 && !isRunning && (
          <div className="space-y-2 text-[11px] sm:text-xs">
            <span className="text-white/30 block">// OP Codes Automation Engine configuration</span>
            <div className="text-cyan-400">
              <span className="text-purple-400">const</span> config = &#123;
              <div className="pl-3 sm:pl-4 text-text-primary">
                <div>client: <span className="text-amber-300">"PME_Scale_Active"</span>,</div>
                <div>sincronizacao: [
                  <span className="text-amber-300">"WhatsApp"</span>,{' '}
                  <span className="text-amber-300">"Bling_ERP"</span>,{' '}
                  <span className="text-amber-300">"HubSpot_CRM"</span>
                ],</div>
                <div>status: <span className="text-cyan-300">"OPERATIONAL_STABLE"</span>,</div>
                <div>workflows: <span className="text-blue-400">14</span>,</div>
                <div>logs: <span className="text-amber-300">"0 erros nas últimas 72 horas"</span></div>
              </div>
              &#125;
            </div>
            <div className="text-white/30 pt-2 block">// Clique em 'Run Code' para executar o workflow.</div>
          </div>
        )}

        {logs.map((log, idx) => {
          let styleClass = 'text-text-primary'
          if (log.includes('SUCCESS')) styleClass = 'text-cyan-300 font-bold'
          else if (log.includes('LLM ready') || log.includes('Gemini')) styleClass = 'text-cyan-400'
          else if (log.includes('PostgreSQL') || log.includes('DB record')) styleClass = 'text-blue-400'
          else if (log.includes('Trigger') || log.includes('received')) styleClass = 'text-amber-300'
          else if (log.includes('Booting') || log.includes('Connecting')) styleClass = 'text-text-secondary opacity-70'

          return (
            <div key={idx} className={`${styleClass} animate-fade-in flex items-start gap-2 break-words text-[11px] sm:text-xs`}>
              <span className="text-white/20 select-none shrink-0">{(idx + 1).toString().padStart(2, '0')}</span>
              <span className="break-all sm:break-normal">{log}</span>
            </div>
          )
        })}

        {isRunning && (
          <div className="flex items-center gap-1.5 pl-4 sm:pl-6 text-cyan-300 animate-pulse text-[11px] sm:text-xs">
            <span className="text-white/20 select-none">{(logs.length + 1).toString().padStart(2, '0')}</span>
            <span>&gt; pipeline processing...</span>
          </div>
        )}
      </div>

      {/* Terminal Footer Info */}
      <div className="flex justify-between items-center px-3 sm:px-4 py-2 border-t border-white/[0.06] bg-[#0c0d11]/70 text-[10px] text-white/40">
        <span>Encoding: UTF-8</span>
        <span className="hidden sm:inline">Lines: {logs.length || 12}</span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-cyan-300">Connected</span>
        </span>
      </div>
    </div>
  )
}
