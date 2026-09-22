import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { Employee, EmployeesState, NewEmployee } from '@/types'
import { employeeService } from '@/services/api'

const toErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : 'Erro inesperado ao comunicar com o servidor'

export const fetchEmployees = createAsyncThunk(
  'employees/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await employeeService.getAll()
    } catch (error: unknown) {
      return rejectWithValue(toErrorMessage(error))
    }
  },
)

export const createEmployee = createAsyncThunk(
  'employees/create',
  async (employee: NewEmployee, { rejectWithValue }) => {
    try {
      return await employeeService.create(employee)
    } catch (error: unknown) {
      return rejectWithValue(toErrorMessage(error))
    }
  },
)

export const updateEmployee = createAsyncThunk(
  'employees/update',
  async (employee: Employee, { rejectWithValue }) => {
    try {
      return await employeeService.update(employee)
    } catch (error: unknown) {
      return rejectWithValue(toErrorMessage(error))
    }
  },
)

export const deleteEmployee = createAsyncThunk(
  'employees/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await employeeService.remove(id)
      return id
    } catch (error: unknown) {
      return rejectWithValue(toErrorMessage(error))
    }
  },
)

const initialState: EmployeesState = {
  items: [],
  loading: false,
  error: null,
  isFormOpen: false,
  editingEmployee: null,
  showActiveOnly: false,
}

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    openCreateForm: (state) => {
      state.isFormOpen = true
      state.editingEmployee = null
    },
    openEditForm: (state, action: PayloadAction<Employee>) => {
      state.isFormOpen = true
      state.editingEmployee = action.payload
    },
    closeForm: (state) => {
      state.isFormOpen = false
      state.editingEmployee = null
    },
    toggleActiveOnly: (state) => {
      state.showActiveOnly = !state.showActiveOnly
    },
    clearFilters: (state) => {
      state.showActiveOnly = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
        state.isFormOpen = false
        state.editingEmployee = null
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.error = action.payload as string
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id)
        if (index !== -1) state.items[index] = action.payload
        state.isFormOpen = false
        state.editingEmployee = null
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.error = action.payload as string
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload)
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.error = action.payload as string
      })
  },
})

export const { openCreateForm, openEditForm, closeForm, toggleActiveOnly, clearFilters } =
  employeesSlice.actions

export default employeesSlice.reducer
