import { ProjectRepository } from '../../repositories/ProjectsRepository'
import { ProjectAlreadyExistsError } from './errors/ProjectAlreadyExistsError'

export class CreateProjectService {
  constructor(protected projectRepository: ProjectRepository) {}

  public async handle(data: ProjectRepository.Create) {
    const project = await this.projectRepository.findBy('slug', data.slug)
    if (!project) {
      return this.projectRepository.create(data)
    }

    throw new ProjectAlreadyExistsError(project)
  }
}
