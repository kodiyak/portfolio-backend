import { CreateProjectController } from '@core/modules/projects/controllers/CreateProjectController'
import { ExpressAdapter } from '@infra/adapters/ExpressAdapter'
import { Router } from 'express'
import * as yup from 'yup'

const routes = Router()

routes.post(
  '/api/v1/projects',
  ExpressAdapter.create(
    new CreateProjectController().handle,
    yup.object().shape({
      title: yup.string().required(),
    })
  )
)

export default routes
