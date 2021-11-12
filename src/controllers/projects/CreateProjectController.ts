import { CreateProjectService } from '../../core/services/projects/CreateProjectService'
import { ProjectAlreadyExistsError } from '../../core/services/projects/errors/ProjectAlreadyExistsError'
import { HttpError } from '../../infra/presentations/HttpError'
import { ProjectRepositoryPrisma } from '../../infra/repositories/ProjectRepositoryPrisma'

export class CreateProjectController {
  public async handle(params: any) {
    try {
      const service = new CreateProjectService(new ProjectRepositoryPrisma())
      return await service.handle(params)
    } catch (err) {
      if (err instanceof ProjectAlreadyExistsError) {
        throw new HttpError(err.message).setCode(409)
      }
    }
  }
}
