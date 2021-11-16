import * as yup from 'yup'

export abstract class HttpValidator<T = any> {
  protected yup: typeof yup

  constructor() {
    this.yup = yup
  }

  public abstract validate(data: T): Promise<void>

  public static getErrorsJson(err: yup.ValidationError): HttpValidator.Errors {
    const errors: HttpValidator.Errors = {
      message: 'Validation Error',
      errors: [],
    }

    for (const index in err.errors) {
      const message = err.errors[index]
      const { path } = err.inner[index]
      errors.errors.push({
        message,
        path,
      })
    }

    return errors
  }
}

export namespace HttpValidator {
  export type Errors = {
    message: string
    errors: Array<{ path: string; message: string }>
  }
}
