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

// Dados de fallback para renderização instantânea
export const FALLBACK_PROJECTS: Project[] = [
  {
    slug: 'saas-duda-mvp',
    title: 'SaaS Duda — Microsserviço de Backend Multi-Tenant',
    category: 'saas',
    short_description: 'Backend robusto para automação de documentos e gestão de tarefas com PostgreSQL assíncrono, SQLAlchemy 2.0, migrations via Alembic e autenticação JWT.',
    tech_stack: ['FastAPI', 'Python', 'PostgreSQL', 'SQLAlchemy', 'Docker', 'Alembic'],
    github_url: 'https://github.com',
    demo_url: 'https://demo.opcodes.dev/saas-duda',
    is_featured: true,
    is_public: true,
  },
  {
    slug: 'adriano-ai-os',
    title: 'AI-OS — Sistema Operacional de IA & Orquestração',
    category: 'ai_agents',
    short_description: 'Plataforma completa de chat e orquestração de IA conectada a múltiplos provedores (Anthropic, OpenAI, Groq) com persistência e SSR via Supabase.',
    tech_stack: ['Next.js', 'TypeScript', 'Vercel AI SDK', 'Supabase SSR', 'Groq', 'Anthropic'],
    github_url: 'https://github.com',
    demo_url: 'https://demo.opcodes.dev/ai-os',
    is_featured: true,
    is_public: true,
  },
  {
    slug: 'harmofin-v2',
    title: 'Harmofin v2 — Gestão Financeira & Agendamento Inteligente',
    category: 'saas',
    short_description: 'Plataforma completa de controle financeiro e inteligência de fluxo de caixa com interface em React, Radix UI e banco de dados Firebase Data Connect.',
    tech_stack: ['React', 'TypeScript', 'Radix UI', 'Firebase Data Connect', 'FullCalendar'],
    github_url: 'https://github.com',
    demo_url: 'https://demo.opcodes.dev/harmofin',
    is_featured: true,
    is_public: true,
  },
  {
    slug: 'habits',
    title: 'Habits AI — Rastreador de Hábitos com Inteligência Generativa',
    category: 'ai_agents',
    short_description: 'Aplicação moderna em Next.js com sugestões e análises de consistência de rotina alimentadas pela API do Google Gemini.',
    tech_stack: ['Next.js', 'React', 'Google Gemini AI', 'Shadcn UI', 'Tailwind CSS'],
    github_url: 'https://github.com',
    demo_url: 'https://demo.opcodes.dev/habits',
    is_featured: false,
    is_public: true,
  },
  {
    slug: 'dashboard-financeiro',
    title: 'Analytics Dashboard — BI & Visualização de Dados Financeiros',
    category: 'data_eng',
    short_description: 'Painel analítico completo desenvolvido em Python Streamlit com gráficos interativos via Plotly e integração a banco relacional PostgreSQL.',
    tech_stack: ['Python', 'Streamlit', 'Plotly', 'Pandas', 'PostgreSQL'],
    github_url: 'https://github.com',
    demo_url: 'https://demo.opcodes.dev/analytics',
    is_featured: false,
    is_public: true,
  },
  {
    slug: 'lionofjuda',
    title: 'Lion of Juda — Plataforma de Publicação Estática de Ultra-Performance',
    category: 'saas',
    short_description: 'Motor de blog e documentação construído em Astro e Tailwind v4 com geração de imagens dinâmicas via Satori e Score 100 no Lighthouse.',
    tech_stack: ['Astro', 'Tailwind CSS v4', 'Satori', 'Docker'],
    github_url: 'https://github.com',
    demo_url: 'https://demo.opcodes.dev/blog',
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
