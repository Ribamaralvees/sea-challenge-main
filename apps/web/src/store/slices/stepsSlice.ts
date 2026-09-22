import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { StepsState } from '@/types'
import { stepService } from '@/services/api'

const toErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : 'Erro inesperado ao comunicar com o servidor'

export const fetchSteps = createAsyncThunk(
  'steps/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await stepService.getAll()
    } catch (error: unknown) {
      return rejectWithValue(toErrorMessage(error))
    }
  },
)

export const setStepCompleted = createAsyncThunk(
  'steps/setCompleted',
  async ({ id, completed }: { id: string; completed: boolean }, { rejectWithValue }) => {
    try {
      return await stepService.setCompleted(id, completed)
    } catch (error: unknown) {
      return rejectWithValue(toErrorMessage(error))
    }
  },
)

const initialState: StepsState = {
  items: [],
  currentIndex: 0,
  loading: false,
  error: null,
}

const stepsSlice = createSlice({
  name: 'steps',
  initialState,
  reducers: {
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSteps.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSteps.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchSteps.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(setStepCompleted.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id)
        if (index !== -1) state.items[index] = action.payload
      })
  },
})

export const { setCurrentIndex } = stepsSlice.actions
export default stepsSlice.reducer
