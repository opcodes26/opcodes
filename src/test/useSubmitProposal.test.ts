/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useSubmitProposal } from '../hooks/useSubmitProposal'

describe('useSubmitProposal', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should initialize with default states', () => {
    const { result } = renderHook(() => useSubmitProposal())

    expect(result.current.isPending).toBe(false)
    expect(result.current.error).toBeNull()
    expect(result.current.isSuccess).toBe(false)
  })

  it('should successfully submit a valid proposal', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({ success: true, message: 'Proposta recebida com sucesso!' }),
    }
    vi.mocked(fetch).mockResolvedValueOnce(mockResponse as any)

    const { result } = renderHook(() => useSubmitProposal())

    const validData = {
      name: 'Adriano',
      email: 'adriano@example.com',
      company: 'Aruk Enterprise',
      process: 'Integração Geral de Sistemas e Planilhas' as const,
      description: 'Gostaria de solicitar um orçamento para desenvolvimento de landing page.',
    }

    let promise: Promise<void> | null = null
    act(() => {
      promise = result.current.submitProposal(validData)
    })

    expect(result.current.isPending).toBe(true)

    await act(async () => {
      await promise
    })

    expect(result.current.isPending).toBe(false)
    expect(result.current.error).toBeNull()
    expect(result.current.isSuccess).toBe(true)
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('should set error state for invalid data input', async () => {
    const { result } = renderHook(() => useSubmitProposal())

    const invalidData = {
      name: 'A',
      email: 'invalid-email',
      company: '',
      process: 'Invalid Process' as any,
      description: 'Short',
    }

    let promise: Promise<void> | null = null
    act(() => {
      promise = result.current.submitProposal(invalidData)
    })

    await act(async () => {
      await promise
    })

    expect(result.current.isPending).toBe(false)
    expect(result.current.error).not.toBeNull()
    expect(result.current.isSuccess).toBe(false)
    expect(fetch).not.toHaveBeenCalled()
  })

  it('should set error state when the API returns an error', async () => {
    const mockResponse = {
      ok: false,
      status: 400,
      json: async () => ({ success: false, error: 'Dados inválidos do servidor' }),
    }
    vi.mocked(fetch).mockResolvedValueOnce(mockResponse as any)

    const { result } = renderHook(() => useSubmitProposal())

    const validData = {
      name: 'Adriano',
      email: 'adriano@example.com',
      company: 'Aruk Enterprise',
      process: 'Integração Geral de Sistemas e Planilhas' as const,
      description: 'Gostaria de solicitar um orçamento para desenvolvimento de landing page.',
    }

    let promise: Promise<void> | null = null
    act(() => {
      promise = result.current.submitProposal(validData)
    })

    await act(async () => {
      await promise
    })

    expect(result.current.isPending).toBe(false)
    expect(result.current.error).toBe('Dados inválidos do servidor')
    expect(result.current.isSuccess).toBe(false)
    expect(fetch).toHaveBeenCalledTimes(1)
  })
})
