class AppError {
  public readonly error: string

  public readonly message: string

  public readonly statusCode: number

  constructor(error: string, message: string, statusCode = 400) {
    this.error = error
    this.message = message
    this.statusCode = statusCode
  }
}

export default AppError
