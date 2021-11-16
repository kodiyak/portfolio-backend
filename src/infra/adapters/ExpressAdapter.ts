import { Request, Response } from 'express'
import * as yup from 'yup'
import { HttpError } from '../../core/http/HttpError'

export class ExpressAdapter {
  public static create<B = any>(callback: ExpressAdapter.Callback<B>, schema?: yup.ObjectSchema<any>) {
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
          const results = ExpressAdapter.getValidationErrors(err)
          return response.status(400).json(results)
        }

        if (err instanceof HttpError) {
          return response.status(err.getCode()).json(err.toJSON())
        }

        return response.status(err.code || 500).json({
          message: err.message,
          stack: err.stack.split('\n').map((line) => line.trim()),
          code: err.code,
        })
      }
    }
  }

  public static getValidationErrors(error: yup.ValidationError) {
    const errors: Array<{ path: string; message: string }> = []
    for (const index in error.errors) {
      const message = error.errors[index]
      const { path } = error.inner[index]
      errors.push({
        message,
        path,
      })
    }

    return {
      message: 'Validation Error',
      errors,
    }
  }
}

export namespace ExpressAdapter {
  export type Callback<B> = (body: B) => any
}
