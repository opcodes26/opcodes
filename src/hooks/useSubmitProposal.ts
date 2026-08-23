import { useState } from 'react'
import { z } from 'zod'
import { submitLead } from '../lib/supabase'

export const proposalSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail corporativo inválido'),
  company: z.string().min(2, 'O nome da empresa deve ter pelo menos 2 caracteres'),
  process: z.enum([
    'Vendas e Entrada de Leads (CRM/WhatsApp)',
    'Faturamento e Emissão Fiscal (NF-e/ERP)',
    'Integração Geral de Sistemas e Planilhas',
    'Assistente de IA / RAG sobre Documentos',
    'Outro processo manual sob medida'
  ], {
    message: 'Selecione um processo crítico para continuar'
  }),
  description: z.string().min(10, 'A descrição deve ter pelo menos 10 caracteres'),
})

export type ProposalInput = z.infer<typeof proposalSchema>

export function useSubmitProposal() {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const submitProposal = async (data: ProposalInput) => {
    setIsPending(true)
    setError(null)
    setIsSuccess(false)

    try {
      proposalSchema.parse(data)

      const res = await submitLead({
        name: data.name,
        email: data.email,
        company: data.company,
        project_type: data.process,
        message: data.description,
      })

      if (!res.success) {
        throw new Error(res.error || 'Erro ao gravar lead no banco.')
      }

      setIsSuccess(true)
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        setError(err.issues[0]?.message || 'Erro de validação')
      } else if (err instanceof Error) {
        setError(err.message || 'Erro ao enviar proposta')
      } else {
        setError('Erro desconhecido ao enviar proposta')
      }
    } finally {
      setIsPending(false)
    }
  }

  return {
    submitProposal,
    isPending,
    error,
    isSuccess,
  }
}
