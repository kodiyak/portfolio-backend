import { CreateProjectService } from '../services/CreateProjectService'
import { HttpError } from '../../../http/HttpError'
import { ProjectRepositoryPrisma } from '../../../../infra/repositories/ProjectRepositoryPrisma'

export class CreateProjectController {
  public async handle(params: any) {
    try {
      const service = new CreateProjectService(new ProjectRepositoryPrisma())
      return await service.handle(params)
    } catch (err) {
      throw new HttpError(err.message).setCode(500)
    }
  }
}
