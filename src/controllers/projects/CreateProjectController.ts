import { CreateProjectService } from '../../core/services/projects/CreateProjectService'

export class CreateProjectController {
  public async handle(params: any) {
    const service = new CreateProjectService()

    return await service.handle(params)
  }
}
