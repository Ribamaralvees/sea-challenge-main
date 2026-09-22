import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from '@/components/ui/Button'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.error('Erro não tratado na UI:', error, info.componentStack)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
          <div className="w-full max-w-md rounded-panel bg-surface p-8 text-center shadow-card">
            <h1 className="text-xl font-semibold text-content-heading">
              Algo deu errado
            </h1>
            <p className="mt-2 text-sm text-content-secondary">
              Ocorreu um erro inesperado. Tente recarregar a página.
            </p>
            <Button variant="solid" className="mt-6" onClick={this.handleReload}>
              Recarregar
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
