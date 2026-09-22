import { describe, expect, it } from 'vitest'
import { maskCpf, onlyDigits } from './cpf'
import { CPF_PATTERN } from '@sea/shared'

describe('onlyDigits', () => {
  it('remove tudo que não é dígito', () => {
    expect(onlyDigits('000.111.222-33')).toBe('00011122233')
  })
})

describe('maskCpf', () => {
  it('formata 11 dígitos no padrão do CPF', () => {
    expect(maskCpf('00011122233')).toBe('000.111.222-33')
  })

  it('formata parcialmente enquanto o usuário digita', () => {
    expect(maskCpf('000')).toBe('000')
    expect(maskCpf('0001')).toBe('000.1')
    expect(maskCpf('0001112')).toBe('000.111.2')
  })

  it('ignora dígitos além do 11º', () => {
    expect(maskCpf('000111222339999')).toBe('000.111.222-33')
  })

  it('produz um valor que casa com CPF_PATTERN', () => {
    expect(CPF_PATTERN.test(maskCpf('00011122233'))).toBe(true)
  })
})
