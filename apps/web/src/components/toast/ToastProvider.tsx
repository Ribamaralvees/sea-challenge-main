import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { cn } from '@/utils/cn'
import { AlertCircleIcon, CheckCircleIcon, CloseIcon } from '@/components/icons'

type ToastVariant = 'success' | 'error'

interface ToastItem {
  id: string
  variant: ToastVariant
  message: string
}

interface ToastContextValue {
  showToast: (variant: ToastVariant, message: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const TOAST_DURATION_MS = 5000

const nextId = (): string =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast deve ser usado dentro de ToastProvider')
  return context
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (variant: ToastVariant, message: string) => {
      const id = nextId()
      setToasts((current) => [...current, { id, variant, message }])
      setTimeout(() => dismissToast(id), TOAST_DURATION_MS)
    },
    [dismissToast],
  )

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div
        role="region"
        aria-label="Notificações"
        className="fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2"
      >
        {toasts.map((toast) => (
          <ToastCard
            key={toast.id}
            toast={toast}
            onDismiss={() => dismissToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function ToastCard({ toast, onDismiss }: { toast: ToastItem; onDismiss: () => void }) {
  const isError = toast.variant === 'error'

  return (
    <div
      role={isError ? 'alert' : 'status'}
      className={cn(
        'flex items-start gap-3 rounded-card border bg-surface p-4 shadow-menu',
        isError ? 'border-red-300' : 'border-emerald-300',
      )}
    >
      {isError ? (
        <AlertCircleIcon className="h-5 w-5 shrink-0 text-red-500" />
      ) : (
        <CheckCircleIcon className="h-5 w-5 shrink-0 text-emerald-500" />
      )}

      <p className="flex-1 text-sm text-content-heading">{toast.message}</p>

      <button
        type="button"
        aria-label="Fechar notificação"
        onClick={onDismiss}
        className="text-content-muted transition-colors hover:text-content-heading"
      >
        <CloseIcon className="h-4 w-4" />
      </button>
    </div>
  )
}
