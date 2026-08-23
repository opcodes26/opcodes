import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jpcldqsqxxmqkasiiphq.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwY2xkcXNxeHhtcWthc2lpcGhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1MjE2ODksImV4cCI6MjEwMzA5NzY4OX0.vNooJPotKBP9utzPQZTtAqFuXu9GmCvMdRKLP5ai_wI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: 'portfolio',
  },
})

export interface Project {
  id?: string
  slug: string
  title: string
  category: 'saas' | 'ai_agents' | 'data_eng' | 'automation'
  short_description: string
  full_case_study?: string
  mermaid_architecture?: string
  tech_stack: string[]
  github_url?: string
  is_featured: boolean
  is_public: boolean
}

export interface LeadSubmission {
  name: string
  email: string
  company?: string
  project_type: string
  message: string
}

// Dados de fallback 100% anonimizados (Foco exclusivo em Casos de Uso e Arquitetura)
export const FALLBACK_PROJECTS: Project[] = [
  {
    slug: 'saas-duda-mvp',
    title: 'OP Platform Core — Microsserviço Multi-Tenant de Pautas & Gestão',
    category: 'saas',
    short_description: 'Backend robusto em FastAPI e PostgreSQL assíncrono para gestão de tarefas, ciclos operacionais e pautas com isolamento multi-tenant estrito, migrations versionadas via Alembic e autenticação JWT.',
    tech_stack: ['FastAPI', 'Python', 'PostgreSQL', 'SQLAlchemy', 'Docker', 'Alembic'],
    github_url: 'https://github.com/opcodes26/saas-duda-core',
    is_featured: true,
    is_public: true,
  },
  {
    slug: 'itsm-ai-classifier',
    title: 'ITSM Ticket Intelligence — Mineração de Causa-Raiz & Análise de Incidentes',
    category: 'ai_agents',
    short_description: 'Higienização e análise semântica de bases de chamados não estruturados com LLM, identificando falhas recorrentes e gerando diagnósticos para atuação na causa-raiz.',
    tech_stack: ['Python', 'Pandas', 'Gemini 2.5 Flash', 'NLP', 'Data Cleaning', 'PostgreSQL'],
    github_url: 'https://github.com/opcodes26/itsm-classifier-core',
    is_featured: true,
    is_public: true,
  },
  {
    slug: 'iot-fleet-telemetry',
    title: 'Invoice & Fleet Automation — Extração de Faturas de Outsourcing & Conciliação',
    category: 'automation',
    short_description: 'Pipeline de extração estruturada de dados de faturas e notas fiscais de fornecedores em PDF com conciliação automática com relatórios de contadores de hardware.',
    tech_stack: ['Python', 'OCR & PDF Parsing', 'PostgreSQL', 'Excel/Sheets API', 'Pandas'],
    github_url: 'https://github.com/opcodes26/invoice-automation-engine',
    is_featured: true,
    is_public: true,
  },
  {
    slug: 'adriano-ai-os',
    title: 'AI Studio & Gateway — Plataforma de Orquestração Cognitiva Multi-LLM',
    category: 'ai_agents',
    short_description: 'Plataforma de orquestração de IA conectada a múltiplos provedores (Anthropic, OpenAI, Groq) com suporte a streaming de tokens e persistência de sessões no Supabase.',
    tech_stack: ['Next.js', 'TypeScript', 'Vercel AI SDK', 'Supabase SSR', 'Groq', 'Anthropic'],
    github_url: 'https://github.com/opcodes26/ai-platform-core',
    is_featured: true,
    is_public: true,
  },
  {
    slug: 'harmofin-v2',
    title: 'Voice Intake Engine — Extração Cognitiva de Voz & Controle de Insumos',
    category: 'saas',
    short_description: 'Sistema de ingestão de áudio via WhatsApp/inbox, transcrição e extração de dados com Gemini Flash para controle de estoque de insumos e agendamentos.',
    tech_stack: ['React', 'TypeScript', 'Radix UI', 'Firebase Data Connect', 'FullCalendar'],
    github_url: 'https://github.com/opcodes26/voice-intake-engine',
    is_featured: true,
    is_public: true,
  },
  {
    slug: 'dashboard-financeiro',
    title: 'Financial Ledger & BI — Painel Analítico de Conciliação em Python',
    category: 'data_eng',
    short_description: 'Painel analítico em Python e Streamlit integrado ao PostgreSQL para visualização de dados financeiros e relatórios dinâmicos via Plotly.',
    tech_stack: ['Python', 'Streamlit', 'Plotly', 'Pandas', 'PostgreSQL'],
    github_url: 'https://github.com/opcodes26/financial-bi-engine',
    is_featured: false,
    is_public: true,
  },
  {
    slug: 'habits',
    title: 'Habits Engine — Rastreador de Consistência com IA Generativa',
    category: 'ai_agents',
    short_description: 'Aplicação Next.js com geração dinâmica de análises de rotina e insights de produtividade alimentados pela API do Google Gemini.',
    tech_stack: ['Next.js', 'React', 'Google Gemini AI', 'Shadcn UI', 'Tailwind CSS'],
    github_url: 'https://github.com/opcodes26/habits-engine',
    is_featured: false,
    is_public: true,
  },
  {
    slug: 'lionofjuda',
    title: 'Static Edge Publisher — Motor de Documentação & Blog de Ultra-Performance',
    category: 'saas',
    short_description: 'Motor de publicação estática com Astro e Tailwind CSS v4 com renderização dinâmica de imagens Open Graph via Satori.',
    tech_stack: ['Astro', 'Tailwind CSS v4', 'Satori', 'Docker'],
    github_url: 'https://github.com/opcodes26/static-edge-publisher',
    is_featured: false,
    is_public: true,
  },
]

export async function fetchProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_public', true)
      .order('is_featured', { ascending: false })

    if (error || !data || data.length === 0) {
      return FALLBACK_PROJECTS
    }
    return data as Project[]
  } catch {
    return FALLBACK_PROJECTS
  }
}

export async function submitLead(lead: LeadSubmission): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('leads').insert([lead])
    if (error) throw error
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro ao enviar proposta.'
    return { success: false, error: message }
  }
}
