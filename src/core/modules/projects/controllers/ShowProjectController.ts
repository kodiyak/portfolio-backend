import { HttpError } from '@core/http/HttpError'
import { HttpResponse } from '@core/http/HttpResponse'
import { ProjectRepositoryPrisma } from '@infra/repositories/ProjectRepositoryPrisma'
import { ShowProjectService } from '../services/ShowProjectService'

export class ShowProjectController {
  public async handle(params: ShowProjectController.Data) {
    try {
      const service = new ShowProjectService(new ProjectRepositoryPrisma())
      return new HttpResponse().setBody(await service.handle(params)).setCode(200)
    } catch (err) {
      throw new HttpError(err.message).setCode(500)
    }
  }
}

export namespace ShowProjectController {
  export type Data = any
}
