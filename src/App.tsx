import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSubmitProposal, proposalSchema, type ProposalInput } from './hooks/useSubmitProposal'

export default function App() {
  const { submitProposal, isPending, error, isSuccess } = useSubmitProposal()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProposalInput>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      name: '',
      email: '',
      description: '',
    },
  })

  const onSubmit = async (data: ProposalInput) => {
    await submitProposal(data)
    if (!error) {
      reset()
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center p-4">
      <main className="w-full max-w-md bg-slate-800 p-6 rounded-lg shadow-xl border border-slate-700">
        <h1 className="text-2xl font-bold text-center mb-6">OP Codes Proposal Submission</h1>

        {isSuccess && (
          <div className="p-3 mb-4 bg-emerald-500/20 border border-emerald-500 text-emerald-300 rounded text-center">
            Proposta enviada com sucesso!
          </div>
        )}

        {error && (
          <div className="p-3 mb-4 bg-rose-500/20 border border-rose-500 text-rose-300 rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Nome
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
            {errors.name && (
              <p className="text-xs text-rose-400 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
            {errors.email && (
              <p className="text-xs text-rose-400 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="description">
              Descrição do Projeto
            </label>
            <textarea
              id="description"
              {...register('description')}
              rows={4}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
            {errors.description && (
              <p className="text-xs text-rose-400 mt-1">{errors.description.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 rounded font-semibold text-white transition-colors duration-200"
          >
            {isPending ? 'Enviando...' : 'Enviar Proposta'}
          </button>
        </form>
      </main>
    </div>
  )
}
