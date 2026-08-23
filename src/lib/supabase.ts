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
  demo_url?: string
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

// Dados de fallback para renderização instantânea (Sem dados inflados ou links quebrados)
export const FALLBACK_PROJECTS: Project[] = [
  {
    slug: 'itsm-ai-classifier',
    title: 'ITSM AI Classifier — Triagem & Roteamento Cognitivo de Incidentes',
    category: 'ai_agents',
    short_description: 'Microsserviço em Python/FastAPI que recebe payloads de incidentes, executa classificação semântica com Gemini 2.5 Flash e categoriza squad e criticidade via schema JSON estruturado.',
    tech_stack: ['Python', 'Gemini 2.5 Flash', 'FastAPI', 'PostgreSQL', 'Docker', 'Webhooks'],
    github_url: 'https://github.com/opcodes26/itsm-classifier-core',
    demo_url: '#cases-visuais',
    is_featured: true,
    is_public: true,
  },
  {
    slug: 'iot-fleet-telemetry',
    title: 'IoT Telemetry Engine — Monitoramento Preditivo de Suprimentos & Hardware',
    category: 'automation',
    short_description: 'Arquitetura de coleta de contadores e níveis de suprimentos via protocolo SNMP com projeção de consumo e integração a webhooks de faturamento.',
    tech_stack: ['Python', 'SNMP Telemetry', 'PostgreSQL Timescale', 'n8n Workflows', 'ERP Sync'],
    github_url: 'https://github.com/opcodes26/iot-telemetry-engine',
    demo_url: '#cases-visuais',
    is_featured: true,
    is_public: true,
  },
  {
    slug: 'saas-duda-mvp',
    title: 'SaaS Duda — Microsserviço de Backend Multi-Tenant',
    category: 'saas',
    short_description: 'Backend completo em FastAPI com PostgreSQL assíncrono, SQLAlchemy 2.0, isolamento multi-tenant por tenant_id, migrations Alembic e autenticação JWT.',
    tech_stack: ['FastAPI', 'Python', 'PostgreSQL', 'SQLAlchemy', 'Docker', 'Alembic'],
    github_url: 'https://github.com/opcodes26/saas-duda-core',
    demo_url: undefined,
    is_featured: true,
    is_public: true,
  },
  {
    slug: 'adriano-ai-os',
    title: 'AI-OS — Sistema Operacional de IA & Orquestração',
    category: 'ai_agents',
    short_description: 'Plataforma de orquestração de IA com Next.js, Vercel AI SDK e suporte a múltiplos provedores (Anthropic, OpenAI, Groq) com persistência no Supabase.',
    tech_stack: ['Next.js', 'TypeScript', 'Vercel AI SDK', 'Supabase SSR', 'Groq', 'Anthropic'],
    github_url: 'https://github.com/opcodes26/ai-os-platform',
    demo_url: undefined,
    is_featured: true,
    is_public: true,
  },
  {
    slug: 'harmofin-v2',
    title: 'Harmofin v2 — Gestão Financeira & Agendamento Inteligente',
    category: 'saas',
    short_description: 'Aplicação React e Firebase com transcrição de áudio e extração estruturada de procedimentos e controle de insumos clínicos.',
    tech_stack: ['React', 'TypeScript', 'Radix UI', 'Firebase Data Connect', 'FullCalendar'],
    github_url: 'https://github.com/opcodes26/harmofin-core',
    demo_url: '#case-harmofin',
    is_featured: true,
    is_public: true,
  },
  {
    slug: 'habits',
    title: 'Habits AI — Rastreador de Hábitos com Inteligência Generativa',
    category: 'ai_agents',
    short_description: 'Aplicação em Next.js e Tailwind CSS integrada à API do Google Gemini para geração de insights e sugestões de rotina.',
    tech_stack: ['Next.js', 'React', 'Google Gemini AI', 'Shadcn UI', 'Tailwind CSS'],
    github_url: 'https://github.com/opcodes26/habits-ai',
    demo_url: undefined,
    is_featured: false,
    is_public: true,
  },
  {
    slug: 'dashboard-financeiro',
    title: 'Analytics Dashboard — BI & Visualização de Dados Financeiros',
    category: 'data_eng',
    short_description: 'Painel em Python e Streamlit integrado ao PostgreSQL para visualização de lançamentos e fluxo de caixa via Plotly.',
    tech_stack: ['Python', 'Streamlit', 'Plotly', 'Pandas', 'PostgreSQL'],
    github_url: 'https://github.com/opcodes26/finance-bi-engine',
    demo_url: undefined,
    is_featured: false,
    is_public: true,
  },
  {
    slug: 'lionofjuda',
    title: 'Lion of Juda — Plataforma de Publicação Estática de Ultra-Performance',
    category: 'saas',
    short_description: 'Blog estático construído com Astro e Tailwind CSS v4 com renderização de Open Graph dinâmico via Satori.',
    tech_stack: ['Astro', 'Tailwind CSS v4', 'Satori', 'Docker'],
    github_url: 'https://github.com/opcodes26/lion-publisher',
    demo_url: undefined,
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
