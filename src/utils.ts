export function match<TValue extends string | number = string, TReturnValue = unknown>(
  value: TValue,
  lookup: Record<TValue, TReturnValue | ((...args: any[]) => TReturnValue)>,
  ...args: any[]
): TReturnValue {
  if (value in lookup) {
    let returnValue = lookup[value]
    return typeof returnValue === 'function' ? returnValue(...args) : returnValue
  }

  let error = new Error(
    `Tried to handle "${value}" but there is no handler defined. Only defined handlers are: ${Object.keys(lookup)
      .map((key) => `"${key}"`)
      .join(', ')}.`
  )
  throw error
}

export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never
