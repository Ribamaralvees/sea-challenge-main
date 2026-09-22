import { useFieldArray, useFormContext } from 'react-hook-form'
import type { EmployeeFormValues } from '@/schemas/employeeSchema'
import { ACTIVITY_OPTIONS, EPI_OPTIONS } from '@/constants'
import { SelectField } from '@/components/ui/SelectField'
import { TextField } from '@/components/ui/TextField'
import { Button } from '@/components/ui/Button'

interface EpiActivityFieldProps {
  activityIndex: number
  onRemove: () => void
  removable: boolean
}

export function EpiActivityField({
  activityIndex,
  onRemove,
  removable,
}: EpiActivityFieldProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<EmployeeFormValues>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: `epiActivities.${activityIndex}.epis` as `epiActivities.${number}.epis`,
  })

  const epiErrors = errors.epiActivities?.[activityIndex]?.epis

  return (
    <div className="flex flex-col gap-4 rounded-card border border-primary/45 p-4">
      <SelectField
        label="Selecione a atividade:"
        options={ACTIVITY_OPTIONS}
        {...register(
          `epiActivities.${activityIndex}.activity` as `epiActivities.${number}.activity`,
        )}
      />

      {fields.map((field, epiIndex) => {
        const isLast = epiIndex === fields.length - 1
        const caError: string | undefined = epiErrors?.[epiIndex]?.ca?.message

        return (
          <div
            key={field.id}
            className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
          >
            <SelectField
              label="Selecione o EPI:"
              options={EPI_OPTIONS}
              {...register(
                `epiActivities.${activityIndex}.epis.${epiIndex}.name` as `epiActivities.${number}.epis.${number}.name`,
              )}
            />
            <TextField
              label="Informe o número do CA:"
              placeholder="Ex.: 9356"
              error={caError}
              {...register(
                `epiActivities.${activityIndex}.epis.${epiIndex}.ca` as `epiActivities.${number}.epis.${number}.ca`,
              )}
            />
            {isLast ? (
              <Button
                variant="outline"
                onClick={() => append({ name: EPI_OPTIONS[0], ca: '' })}
                className="sm:mb-[1px]"
              >
                Adicionar EPI
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => remove(epiIndex)}
                className="sm:mb-[1px]"
              >
                Excluir EPI
              </Button>
            )}
          </div>
        )
      })}

      {removable && (
        <Button variant="outline" fullWidth onClick={onRemove}>
          Excluir atividade
        </Button>
      )}
    </div>
  )
}
