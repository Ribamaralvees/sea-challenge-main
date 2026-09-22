import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import type { Employee } from '@/types'
import {
  deleteEmployee,
  openCreateForm,
  openEditForm,
} from '@/store/slices/employeesSlice'
import { setStepCompleted } from '@/store/slices/stepsSlice'
import { selectVisibleEmployees } from '@/store/selectors/employeesSelectors'
import { selectCurrentStep } from '@/store/selectors/stepsSelectors'
import { Button } from '@/components/ui/Button'
import { Toggle } from '@/components/ui/Toggle'
import { Modal } from '@/components/ui/Modal'
import { FilterBar } from './FilterBar'
import { EmployeeCard } from './EmployeeCard'

/** Tela principal da etapa: cabeçalho, ações, lista e switch de conclusão. */
export function EmployeeList() {
  const dispatch = useAppDispatch()
  const employees = useAppSelector(selectVisibleEmployees)
  const currentStep = useAppSelector(selectCurrentStep)
  const [deletedOpen, setDeletedOpen] = useState(false)

  const handleDelete = async (employee: Employee) => {
    try {
      await dispatch(deleteEmployee(employee.id)).unwrap()
      setDeletedOpen(true)
    } catch {
      // Erro fica registrado no slice (state.employees.error).
    }
  }

  const handleStepCompleted = (completed: boolean) => {
    if (currentStep) {
      dispatch(setStepCompleted({ id: currentStep.id, completed }))
    }
  }

  return (
    <>
      <section className="overflow-hidden rounded-panel bg-surface shadow-card">
        <header className="bg-primary px-6 py-4">
          <h1 className="text-2xl font-normal text-content-inverse">Funcionário(s)</h1>
        </header>

        <div className="flex flex-col gap-4 p-6">
          <Button
            variant="outline"
            fullWidth
            className="py-3.5"
            onClick={() => dispatch(openCreateForm())}
          >
            + Adicionar Funcionário
          </Button>

          <FilterBar />

          <ul className="mt-2 flex flex-col gap-4">
            {employees.map((employee) => (
              <li key={employee.id}>
                <EmployeeCard
                  employee={employee}
                  onEdit={(selected) => dispatch(openEditForm(selected))}
                  onDelete={handleDelete}
                />
              </li>
            ))}

            {employees.length === 0 && (
              <li className="py-6 text-center text-sm text-content-muted">
                Nenhum funcionário para exibir.
              </li>
            )}
          </ul>

          <div className="mt-2 flex items-center justify-end gap-3">
            <span className="text-sm text-content-secondary">
              A etapa está concluída?
            </span>

            <Toggle
              checked={currentStep?.completed ?? false}
              onChange={handleStepCompleted}
              onLabel="Sim"
              offLabel="Não"
              ariaLabel="Marcar etapa como concluída"
            />
          </div>
        </div>
      </section>

      <Modal
        open={deletedOpen}
        onClose={() => setDeletedOpen(false)}
        ariaLabel="Funcionário excluído"
      >
        <p className="text-lg font-bold text-content-heading">
          Usuário excluído com sucesso!
        </p>

        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setDeletedOpen(false)}
            className="text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
          >
            OK
          </button>
        </div>
      </Modal>
    </>
  )
}
