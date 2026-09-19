export type ClassValue = string | false | null | undefined | Record<string, boolean>

export function cn(...values: ClassValue[]): string {
  const out: string[] = []
  for (const value of values) {
    if (!value) continue
    if (typeof value === 'string') {
      out.push(value)
    } else {
      for (const [className, enabled] of Object.entries(value)) {
        if (enabled) out.push(className)
      }
    }
  }
  return out.join(' ')
}
