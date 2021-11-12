import { Router } from 'express'
import * as yup from 'yup'
import { ExpressAdapter } from '../../adapters/ExpressAdapter'
import { CreateProjectController } from '../../controllers/projects/CreateProjectController'

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
