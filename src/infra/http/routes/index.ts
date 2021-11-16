import { CreateProjectController } from '@core/modules/projects/controllers/CreateProjectController'
import { ExpressAdapter } from '@core/http/adapters/ExpressAdapter'
import { Router } from 'express'
import { CreateProjectValidator } from '@core/modules/projects/controllers/validators/CreateProjectValidator'
import { ShowProjectController } from '@core/modules/projects/controllers/ShowProjectController'
import { ShowProjectValidator } from '@core/modules/projects/controllers/validators/ShowProjectValidator'

const routes = Router()

routes.post('/api/v1/projects', ExpressAdapter.create(new CreateProjectController(), new CreateProjectValidator()))
routes.get('/api/v1/projects/:id', ExpressAdapter.create(new ShowProjectController(), new ShowProjectValidator()))

export default routes
