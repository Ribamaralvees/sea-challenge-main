export const onlyDigits = (value: string): string => value.replace(/\D/g, '')

export function maskCpf(value: string): string {
  const digits = onlyDigits(value).slice(0, 11)
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

export const CPF_PATTERN = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
