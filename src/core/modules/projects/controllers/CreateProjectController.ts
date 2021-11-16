import { Project } from '@core/entities/Project'
import { Controller } from '@core/http/Controller'
import { HttpError } from '@core/http/HttpError'
import { HttpResponse } from '@core/http/HttpResponse'
import { ProjectRepositoryPrisma } from '@infra/repositories/ProjectRepositoryPrisma'
import { CreateProjectService } from '../services/CreateProjectService'

export class CreateProjectController extends Controller {
  public async handle(params: any) {
    try {
      const service = new CreateProjectService(new ProjectRepositoryPrisma())
      return new HttpResponse().setBody(await service.handle(params)).setCode(200)
    } catch (err) {
      throw new HttpError(err.message).setCode(500)
    }
  }
}

export namespace CreateProjectController {
  export type Data = Partial<Project.Data>
}
