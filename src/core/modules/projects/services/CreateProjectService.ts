import { ProjectRepository } from '../../../../contracts/repositories'
import { Project } from '../../../entities/Project'
import StrHelper from '../../../../helpers/StrHelper'

export class CreateProjectService {
  constructor(protected projectRepository: ProjectRepository) {}

  public async handle(data: CreateProjectService.Data) {
    const slug = data.slug || StrHelper.slug(data.title)
    const project = new Project({ ...data, slug })
    return this.projectRepository.create(project)
  }
}

export namespace CreateProjectService {
  export type Data = Partial<Project.Data>
}
