import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { clearFilters, toggleActiveOnly } from '@/store/slices/employeesSlice'
import {
  selectActiveCount,
  selectAllEmployees,
  selectShowActiveOnly,
} from '@/store/selectors/employeesSelectors'
import { Button } from '@/components/ui/Button'

export function FilterBar() {
  const dispatch = useAppDispatch()
  const showActiveOnly = useAppSelector(selectShowActiveOnly)
  const activeCount = useAppSelector(selectActiveCount)
  const total = useAppSelector(selectAllEmployees).length

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        variant={showActiveOnly ? 'ghost' : 'outline'}
        onClick={() => dispatch(toggleActiveOnly())}
        aria-pressed={showActiveOnly}
      >
        Ver apenas ativos
      </Button>

      <Button
        variant={showActiveOnly ? 'outline' : 'ghost'}
        onClick={() => dispatch(clearFilters())}
      >
        Limpar filtros
      </Button>

      <span className="ml-auto text-sm text-content-secondary">
        Ativos {activeCount}/{total}
      </span>
    </div>
  )
}
