import { HttpValidator } from '@core/http/HttpValidator'

export class CreateProjectValidator extends HttpValidator {
  public async validate(data: any) {
    await this.yup
      .object()
      .shape({
        title: this.yup.string().required(),
      })
      .validate(data, { abortEarly: false })
  }
}
