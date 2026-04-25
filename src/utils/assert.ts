export function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`Assertion failed: ${message}`)
}

export function assertDefined<T>(value: T | null | undefined, message: string): T {
  if (value == null) throw new Error(`Expected defined value: ${message}`)

  return value
}

export function unreachable(value: never, message?: string): never {
  throw new Error(message ?? `Unreachable case reached with value: ${String(value)}`)
}
