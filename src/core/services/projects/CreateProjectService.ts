import { ProjectRepositoryPrisma } from '../../../infra/repositories/ProjectRepositoryPrisma'
import { ProjectRepository } from '../../repositories/ProjectsRepository'

export class CreateProjectService {
  constructor(protected projectRepository = new ProjectRepositoryPrisma()) {}

  public async handle(data: ProjectRepository.Create) {
    return this.projectRepository.create(data)
  }
}
