export class AppError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message)
    this.name = new.target.name
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404)
  }
}

export class ValidationError extends AppError {
  constructor(readonly issues: unknown) {
    super('Payload inválido', 400)
  }
}
