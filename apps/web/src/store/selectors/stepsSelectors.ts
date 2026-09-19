import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/store'

const selectStepsState = (state: RootState) => state.steps

export const selectSteps = createSelector(selectStepsState, (steps) => steps.items)

export const selectCurrentIndex = createSelector(
  selectStepsState,
  (steps) => steps.currentIndex,
)

export const selectCurrentStep = createSelector(
  selectStepsState,
  ({ items, currentIndex }) => items[currentIndex] ?? null,
)

export const selectHasProgress = createSelector(
  selectStepsState,
  ({ items, currentIndex }) =>
    currentIndex > 0 || items.some((step) => step.completed),
)
