import { ProjectRepository } from 'src/contracts/repositories'
import { Project } from 'src/core/entities/Project'
import { generateUuid } from '../../../helpers/generateUuid'
import StrHelper from '../../../helpers/StrHelper'

export class CreateProjectService {
  constructor(protected projectRepository: ProjectRepository) {}

  public async handle(data: Partial<Project.Data>) {
    const slug = data.slug || StrHelper.slug(data.title)
    const project = await this.projectRepository.findBy('slug', slug)

    if (!project) {
      return this.projectRepository.create({ ...data, slug })
    } else {
      return this.projectRepository.create({
        ...data,
        slug: `${slug}-${generateUuid()}`,
      })
    }
  }
}
