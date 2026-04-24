export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    message?: string
  ) {
    super(message ?? `${status} ${statusText}`)
    this.name = 'ApiError'
  }
}
