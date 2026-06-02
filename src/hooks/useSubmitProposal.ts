import { useState } from 'react'
import { z } from 'zod'

export const proposalSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
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
      // Validate schema
      proposalSchema.parse(data)

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 500))

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
