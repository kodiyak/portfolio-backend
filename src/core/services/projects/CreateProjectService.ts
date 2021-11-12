import { generateUuid } from '../../../helpers/generateUuid'
import StrHelper from '../../../helpers/StrHelper'
import { ProjectRepository } from '../../repositories/ProjectRepository'

export class CreateProjectService {
  constructor(protected projectRepository: ProjectRepository) {}

  public async handle(data: ProjectRepository.Create) {
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
