import { Request, Response } from 'express'
import * as yup from 'yup'
import { HttpError } from '../infra/presentations/HttpError'

export class ExpressAdapter {
  public static create<B = any>(
    callback: ExpressAdapter.Callback<B>,
    schema?: yup.ObjectSchema<any>
  ) {
    return async (request: Request, response: Response) => {
      try {
        const body = { ...request.body, ...request.params }
        if (schema) {
          await schema.validate(body, { abortEarly: false })
        }

        const results = await callback(body)
        response.json(results)
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const errors: any = {}
          for (const index in err.errors) {
            const msg = err.errors[index]
            const inner = err.inner[index]
            errors[inner.path || ''] = msg
          }
          response.status(400).json(errors)
        }

        if (err instanceof HttpError) {
          return response.status(err.getCode()).json(err.toJSON())
        }

        response.status(err.code || 500).json({
          message: err.message,
          stack: err.stack.split('\n').map((line) => line.trim()),
          code: err.code,
        })
      }
    }
  }
}

export namespace ExpressAdapter {
  export type Callback<B> = (body: B) => any
}
