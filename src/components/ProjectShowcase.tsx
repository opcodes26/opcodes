import { useState, useEffect } from 'react'
import { fetchProjects, FALLBACK_PROJECTS, type Project } from '../lib/supabase'
import { Card } from './ui/Card'
import { Button } from './ui/Button'
import {
  Sparkles,
  ExternalLink,
  Layers,
  CheckCircle2,
  X,
  Code2,
  Terminal,
  Cpu,
} from 'lucide-react'

type CategoryFilter = 'all' | 'saas' | 'ai_agents' | 'data_eng'

export function ProjectShowcase() {
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS)
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all')
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null)

  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data)
    })
  }, [])

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === 'all') return true
    return p.category === selectedCategory
  })

  return (
    <section className="py-20 md:py-28" id="showcase">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 font-mono text-[10px] uppercase tracking-wider">
          <Terminal className="w-3 h-3" />
          <span>PORTFÓLIO & SISTEMAS DE PRODUÇÃO</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-text-primary">
          Engenharia de Software de{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
            Alta Performance
          </span>
        </h2>
        <p className="text-sm md:text-base text-text-secondary leading-relaxed max-w-2xl mx-auto">
          Não apresentamos conceitos vazios. Cada sistema abaixo foi arquitetado do zero, testado e construído com padrões de concorrência, multi-tenancy e inteligência artificial nativa.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 pt-6">
          {[
            { id: 'all', label: 'Todos os Projetos' },
            { id: 'saas', label: 'SaaS & Plataformas' },
            { id: 'ai_agents', label: 'IA & Agentes' },
            { id: 'data_eng', label: 'Engenharia de Dados' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as CategoryFilter)}
              className={`px-4 py-1.5 rounded-lg font-mono text-xs transition-all cursor-pointer border ${
                selectedCategory === cat.id
                  ? 'bg-blue-600/20 border-cyan-400/50 text-cyan-300 shadow-[0_0_18px_rgba(6,182,212,0.25)] font-bold'
                  : 'bg-[#111318] border-white/[0.06] text-text-secondary hover:text-white hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredProjects.map((project) => (
          <Card
            key={project.slug}
            className="p-6 flex flex-col justify-between border border-white/[0.08] bg-[#0c0e12]/90 backdrop-blur-sm group hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.1)] transition-all duration-300"
            glow
            glowColor={project.is_featured ? 'cyan' : 'cyan'}
          >
            <div className="space-y-4">
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-text-secondary">
                  {project.category.replace('_', ' ')}
                </span>
                {project.is_featured && (
                  <span className="flex items-center gap-1 font-mono text-[10px] text-cyan-300 bg-cyan-500/10 border border-cyan-400/30 px-2 py-0.5 rounded-full font-bold shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                    <Sparkles className="w-2.5 h-2.5" />
                    FEATURED
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-text-primary group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                  {project.short_description}
                </p>
              </div>

              {/* Stack Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.tech_stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#13161c] border border-white/[0.06] text-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs in Card */}
            <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between gap-3 mt-6">
              <button
                onClick={() => setActiveModalProject(project)}
                className="font-mono text-xs text-cyan-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Ver Arquitetura</span>
              </button>

              <div className="flex items-center gap-2">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md border border-white/[0.08] hover:border-white/30 text-text-secondary hover:text-white transition-colors"
                    title="Ver no GitHub"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </a>
                )}
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1 rounded-md bg-gradient-to-r from-blue-600/30 to-cyan-500/30 border border-cyan-400/40 text-cyan-300 hover:brightness-125 text-xs font-mono font-medium transition-all shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                  >
                    <span>Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal de Detalhes do Projeto */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#0e1015] border border-cyan-500/20 rounded-xl max-w-2xl w-full p-6 space-y-6 shadow-[0_0_50px_rgba(6,182,212,0.15)] relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg border border-white/10 text-text-secondary hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-400">
                // ESTUDO DE CASO TÉCNICO
              </span>
              <h3 className="text-2xl font-bold text-text-primary">{activeModalProject.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {activeModalProject.short_description}
              </p>
            </div>

            {/* Tech Stack List */}
            <div className="space-y-2">
              <div className="font-mono text-xs text-text-primary font-bold flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Stack Tecnológica & Padrões</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeModalProject.tech_stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-2.5 py-1 rounded bg-[#13161c] border border-white/[0.08] text-white flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Architecture Highlights */}
            <div className="space-y-3 p-4 rounded-lg bg-[#07080a] border border-white/[0.04] font-mono text-xs">
              <div className="text-cyan-400 font-bold flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>Destaques de Engenharia & Governança</span>
              </div>
              <ul className="space-y-2 text-text-secondary text-[11px]">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 shrink-0">&gt;</span>
                  <span><strong>Multi-Tenancy por Design:</strong> Isolamento estrito de dados e segurança RLS.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 shrink-0">&gt;</span>
                  <span><strong>Concorrência & Performance:</strong> Handlers assíncronos e queries otimizadas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 shrink-0">&gt;</span>
                  <span><strong>Testes & CI/CD:</strong> Cobertura de testes unitários e migrations versionadas.</span>
                </li>
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-white/10">
              {activeModalProject.github_url && (
                <a
                  href={activeModalProject.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button variant="outline" className="w-full font-mono text-xs flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    <span>Código no GitHub</span>
                  </Button>
                </a>
              )}
              {activeModalProject.demo_url && (
                <a
                  href={activeModalProject.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button variant="primary" className="w-full font-mono text-xs flex items-center justify-center gap-2">
                    <span>Acessar Plataforma / Live Demo</span>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
