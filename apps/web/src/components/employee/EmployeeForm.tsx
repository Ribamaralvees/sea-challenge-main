import { useMemo } from 'react'
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { employeeSchema, type EmployeeFormValues } from '@/schemas/employeeSchema'
import type { Employee, NewEmployee } from '@/types'
import { ROLE_OPTIONS, ACTIVITY_OPTIONS, EPI_OPTIONS } from '@/constants'
import { maskCpf } from '@/utils/cpf'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { closeForm, createEmployee, updateEmployee } from '@/store/slices/employeesSlice'
import { selectEditingEmployee } from '@/store/selectors/employeesSelectors'
import { useToast } from '@/components/toast/ToastProvider'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { SelectField } from '@/components/ui/SelectField'
import { RadioGroup } from '@/components/ui/RadioGroup'
import { Toggle } from '@/components/ui/Toggle'
import { Checkbox } from '@/components/ui/Checkbox'
import { ArrowLeftIcon } from '@/components/icons'
import { EpiActivityField } from './EpiActivityField'
import { HealthCertificateField } from './HealthCertificateField'

const GENDER_OPTIONS = [
  { label: 'Feminino', value: 'feminino' },
  { label: 'Masculino', value: 'masculino' },
]

const emptyEpiRow = () => ({ name: EPI_OPTIONS[0], ca: '' })
const newActivity = () => ({ activity: ACTIVITY_OPTIONS[0], epis: [emptyEpiRow()] })

function buildDefaults(employee: Employee | null): EmployeeFormValues {
  if (employee) {
    const activities =
      employee.epiActivities.length > 0
        ? employee.epiActivities.map((activity) => ({
            activity: activity.activity,
            epis: activity.epis.length > 0 ? activity.epis : [emptyEpiRow()],
          }))
        : [newActivity()]

    return {
      active: employee.active,
      name: employee.name,
      gender: employee.gender,
      cpf: employee.cpf,
      birthDate: employee.birthDate,
      rg: employee.rg,
      role: employee.role,
      noEpi: employee.epiActivities.length === 0,
      epiActivities: activities,
      healthCertificate: employee.healthCertificate,
    }
  }

  return {
    active: true,
    name: '',
    gender: 'feminino',
    cpf: '',
    birthDate: '',
    rg: '',
    role: '',
    noEpi: false,
    epiActivities: [newActivity()],
    healthCertificate: null,
  }
}

export function EmployeeForm() {
  const dispatch = useAppDispatch()
  const editingEmployee = useAppSelector(selectEditingEmployee)
  const isEditing = Boolean(editingEmployee)
  const { showToast } = useToast()

  const defaultValues = useMemo(() => buildDefaults(editingEmployee), [editingEmployee])

  const methods = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues,
  })

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = methods

  const activities = useFieldArray({ control, name: 'epiActivities' })
  const noEpi = watch('noEpi')

  const onSubmit = async (values: EmployeeFormValues) => {
    const payload: NewEmployee = {
      name: values.name,
      cpf: values.cpf,
      rg: values.rg,
      birthDate: values.birthDate,
      gender: values.gender,
      role: values.role,
      active: values.active,
      epiActivities: values.noEpi ? [] : values.epiActivities,
      healthCertificate: values.noEpi ? null : values.healthCertificate,
    }

    try {
      if (editingEmployee) {
        await dispatch(updateEmployee({ ...payload, id: editingEmployee.id })).unwrap()
        showToast('success', 'Funcionário atualizado com sucesso!')
      } else {
        await dispatch(createEmployee(payload)).unwrap()
        showToast('success', 'Funcionário cadastrado com sucesso!')
      }
    } catch (error) {
      showToast(
        'error',
        typeof error === 'string' ? error : 'Não foi possível salvar o funcionário.',
      )
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="overflow-hidden rounded-panel bg-surface shadow-card"
      >
        <header className="flex items-center gap-3 bg-primary px-6 py-4">
          <button
            type="button"
            aria-label="Voltar para a lista"
            onClick={() => dispatch(closeForm())}
            className="text-content-inverse"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-normal text-content-inverse">
            {isEditing ? 'Editar Funcionário' : 'Adicionar Funcionário'}
          </h1>
        </header>

        <div className="flex flex-col gap-5 p-6">
          <div className="flex items-center justify-between rounded-card border border-primary/45 px-4 py-3">
            <span className="text-sm font-semibold text-content-heading">
              O trabalhador está ativo ou inativo?
            </span>
            <Controller
              control={control}
              name="active"
              render={({ field }) => (
                <Toggle
                  checked={field.value}
                  onChange={field.onChange}
                  onLabel="Ativo"
                  offLabel="Inativo"
                  ariaLabel="Definir se o trabalhador está ativo"
                />
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-4 rounded-card border border-primary/45 p-4 sm:grid-cols-2">
            <TextField
              id="name"
              label="Nome"
              placeholder="Nome completo"
              error={errors.name?.message}
              {...register('name')}
            />

            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <RadioGroup
                  label="Sexo"
                  name="gender"
                  options={GENDER_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.gender?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="cpf"
              render={({ field }) => (
                <TextField
                  id="cpf"
                  label="CPF"
                  placeholder="000.000.000-00"
                  inputMode="numeric"
                  value={field.value}
                  onChange={(event) => field.onChange(maskCpf(event.target.value))}
                  error={errors.cpf?.message}
                />
              )}
            />

            <TextField
              id="birthDate"
              type="date"
              label="Data de Nascimento"
              error={errors.birthDate?.message}
              {...register('birthDate')}
            />

            <TextField
              id="rg"
              label="RG"
              placeholder="00.000.000-0"
              error={errors.rg?.message}
              {...register('rg')}
            />

            <SelectField
              id="role"
              label="Cargo"
              placeholder="Selecione o cargo"
              options={ROLE_OPTIONS}
              error={errors.role?.message}
              {...register('role')}
            />
          </div>

          <div className="flex flex-col gap-4 rounded-card border border-primary/45 p-4">
            <span className="text-sm font-semibold text-content-heading">
              Quais EPIs o trabalhador usa na atividade?
            </span>

            <Controller
              control={control}
              name="noEpi"
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onChange={field.onChange}
                  label="O trabalhador não usa EPI."
                />
              )}
            />

            {!noEpi && (
              <>
                {activities.fields.map((field, index) => (
                  <EpiActivityField
                    key={field.id}
                    activityIndex={index}
                    removable={activities.fields.length > 1}
                    onRemove={() => activities.remove(index)}
                  />
                ))}

                {errors.epiActivities?.message && (
                  <span className="text-xs text-red-500">
                    {errors.epiActivities.message}
                  </span>
                )}

                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => activities.append(newActivity())}
                >
                  Adicionar outra atividade
                </Button>
              </>
            )}
          </div>

          {!noEpi && (
            <Controller
              control={control}
              name="healthCertificate"
              render={({ field }) => (
                <HealthCertificateField
                  fileName={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          )}

          <Button variant="outline" fullWidth type="submit" className="py-3.5">
            Salvar
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
