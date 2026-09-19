import { useRef, useState } from 'react'
import type { Employee } from '@/types'
import { cn } from '@/utils/cn'
import { useClickOutside } from '@/hooks/useClickOutside'
import { Badge } from '@/components/ui/Badge'
import { EllipsisIcon } from '@/components/icons'

interface EmployeeCardProps {
  employee: Employee
  onEdit: (employee: Employee) => void
  onDelete: (employee: Employee) => void
}

export function EmployeeCard({ employee, onEdit, onDelete }: EmployeeCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useClickOutside(menuRef, () => setMenuOpen(false), menuOpen)

  return (
    <article className="flex items-stretch overflow-hidden rounded-card bg-surface-blue">
      <div className="flex flex-1 flex-col gap-3 px-5 py-4">
        <h3 className="text-xl font-normal text-content">{employee.name}</h3>
        <div className="flex flex-wrap gap-2">
          <Badge>{employee.cpf}</Badge>
          <Badge>{employee.active ? 'Ativo' : 'Inativo'}</Badge>
          <Badge>{employee.role}</Badge>
        </div>
      </div>

      <div ref={menuRef} className="relative flex">
        <button
          type="button"
          aria-label={`Ações para ${employee.name}`}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className={cn(
            'flex w-12 items-center justify-center bg-primary text-content-inverse transition-colors hover:bg-primary-dark',
          )}
        >
          <EllipsisIcon className="h-5 w-5" />
        </button>

        {menuOpen && (
          <div
            role="menu"
            className="absolute right-1 top-1 z-20 w-32 overflow-hidden rounded-md border border-content-muted/15 bg-surface shadow-menu"
          >
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setMenuOpen(false)
                onEdit(employee)
              }}
              className="block w-full px-4 py-2.5 text-left text-sm text-content-heading hover:bg-surface-blue"
            >
              Alterar
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setMenuOpen(false)
                onDelete(employee)
              }}
              className="block w-full border-t border-content-muted/15 px-4 py-2.5 text-left text-sm text-content-heading hover:bg-surface-blue"
            >
              Excluir
            </button>
          </div>
        )}
      </div>
    </article>
  )
}
