import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ToastProvider, useToast } from './ToastProvider'

function Trigger() {
  const { showToast } = useToast()
  return (
    <>
      <button onClick={() => showToast('success', 'Salvo com sucesso!')}>
        Disparar sucesso
      </button>
      <button onClick={() => showToast('error', 'Algo deu errado.')}>
        Disparar erro
      </button>
    </>
  )
}

const renderWithProvider = () =>
  render(
    <ToastProvider>
      <Trigger />
    </ToastProvider>,
  )

describe('useToast', () => {
  it('lança erro quando usado fora do ToastProvider', () => {
    const Bare = () => {
      useToast()
      return null
    }
    expect(() => render(<Bare />)).toThrow(
      'useToast deve ser usado dentro de ToastProvider',
    )
  })
})

describe('ToastProvider', () => {
  it('exibe um toast de sucesso com role="status"', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: 'Disparar sucesso' }))

    expect(screen.getByRole('status')).toHaveTextContent('Salvo com sucesso!')
  })

  it('exibe um toast de erro com role="alert"', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: 'Disparar erro' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Algo deu errado.')
  })

  it('fecha o toast ao clicar no botão de fechar', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: 'Disparar erro' }))
    expect(screen.getByRole('alert')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Fechar notificação' }))
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('empilha múltiplos toasts', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: 'Disparar sucesso' }))
    await user.click(screen.getByRole('button', { name: 'Disparar erro' }))

    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
