import { describe, expect, it } from 'vitest'
import type { AxiosError } from 'axios'
import { normalizeApiError, type ApiErrorBody } from './api'

type TestAxiosError = AxiosError<ApiErrorBody>

const makeAxiosError = (overrides: Partial<TestAxiosError>): TestAxiosError =>
  ({
    isAxiosError: true,
    name: 'AxiosError',
    message: 'Request failed with status code 400',
    toJSON: () => ({}),
    ...overrides,
  }) as TestAxiosError

describe('normalizeApiError', () => {
  it('usa a mensagem vinda do corpo da resposta da API quando existe', async () => {
    const error = makeAxiosError({
      response: { data: { message: 'Payload inválido' } } as TestAxiosError['response'],
    })

    await expect(normalizeApiError(error)).rejects.toThrow('Payload inválido')
  })

  it('cai para a mensagem genérica do Axios quando a API não manda uma', async () => {
    const error = makeAxiosError({ message: 'Network Error' })

    await expect(normalizeApiError(error)).rejects.toThrow('Network Error')
  })

  it('rejeita com uma instância real de Error', async () => {
    const error = makeAxiosError({
      response: {
        data: { message: 'Funcionário não encontrado' },
      } as TestAxiosError['response'],
    })

    await expect(normalizeApiError(error)).rejects.toBeInstanceOf(Error)
  })
})
