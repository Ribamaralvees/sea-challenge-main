import { useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { PaperclipIcon } from '@/components/icons'

interface HealthCertificateFieldProps {
  fileName: string | null
  onChange: (fileName: string | null) => void
}

export function HealthCertificateField({
  fileName,
  onChange,
}: HealthCertificateFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex flex-col gap-3 rounded-card border border-primary/45 p-4">
      <span className="text-sm font-semibold text-content-heading">
        Adicione Atestado de Saúde (opcional):
      </span>

      <div className="flex h-11 items-center justify-between rounded-md border border-primary/45 bg-surface px-3 text-sm text-content-heading">
        <span className={fileName ? '' : 'text-content-muted'}>
          {fileName ?? 'Nenhum arquivo selecionado'}
        </span>
        <PaperclipIcon className="h-4 w-4 text-primary" />
      </div>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={(event) => {
          const selected = event.target.files?.[0]
          onChange(selected ? selected.name : null)
        }}
      />

      <Button variant="outline" fullWidth onClick={() => inputRef.current?.click()}>
        Selecionar arquivo
      </Button>
    </div>
  )
}
