import { HttpValidator } from '@core/http/HttpValidator'

export class ShowProjectValidator extends HttpValidator {
  public async validate(data: any) {
    await this.yup
      .object()
      .shape({
        id: this.yup.string().required(),
      })
      .validate(data, { abortEarly: false })
  }
}
