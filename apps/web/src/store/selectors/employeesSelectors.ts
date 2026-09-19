import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/store'

const selectEmployeesState = (state: RootState) => state.employees

export const selectAllEmployees = createSelector(
  selectEmployeesState,
  (employees) => employees.items,
)

export const selectVisibleEmployees = createSelector(
  selectEmployeesState,
  ({ items, showActiveOnly }) =>
    showActiveOnly ? items.filter((employee) => employee.active) : items,
)

export const selectActiveCount = createSelector(
  selectEmployeesState,
  ({ items }) => items.filter((employee) => employee.active).length,
)

export const selectIsFormOpen = createSelector(
  selectEmployeesState,
  (employees) => employees.isFormOpen,
)

export const selectEditingEmployee = createSelector(
  selectEmployeesState,
  (employees) => employees.editingEmployee,
)

export const selectShowActiveOnly = createSelector(
  selectEmployeesState,
  (employees) => employees.showActiveOnly,
)

export const selectEmployeesLoading = createSelector(
  selectEmployeesState,
  (employees) => employees.loading,
)
