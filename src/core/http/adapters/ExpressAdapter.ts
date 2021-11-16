import { HttpError } from '@core/http/HttpError'
import { Request, Response } from 'express'
import * as yup from 'yup'
import { Controller } from '../Controller'
import { HttpValidator } from '../HttpValidator'

export class ExpressAdapter {
  public static create(controller: Controller, validator?: HttpValidator) {
    return async (request: Request, response: Response) => {
      try {
        const body = { ...request.body, ...request.params }
        if (validator) {
          await validator.validate(body)
        }

        const results = await controller.handle(body)
        return response.status(results.getCode()).json(results.toJSON())
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          return response.status(400).json(HttpValidator.getErrorsJson(err))
        }

        if (err instanceof HttpError) {
          return response.status(err.getCode()).json(err.toJSON())
        }

        return response.status(500).json({
          message: err.message,
          stack: err.stack.split('\n').map((line) => line.trim()),
          code: err.code,
        })
      }
    }
  }
}
