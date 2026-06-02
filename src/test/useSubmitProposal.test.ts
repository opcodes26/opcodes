import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useSubmitProposal } from '../hooks/useSubmitProposal'

describe('useSubmitProposal', () => {
  it('should initialize with default states', () => {
    const { result } = renderHook(() => useSubmitProposal())

    expect(result.current.isPending).toBe(false)
    expect(result.current.error).toBeNull()
    expect(result.current.isSuccess).toBe(false)
  })

  it('should successfully submit a valid proposal', async () => {
    const { result } = renderHook(() => useSubmitProposal())

    const validData = {
      name: 'Adriano',
      email: 'adriano@example.com',
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
  })

  it('should set error state for invalid data input', async () => {
    const { result } = renderHook(() => useSubmitProposal())

    const invalidData = {
      name: 'A',
      email: 'invalid-email',
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
  })
})
