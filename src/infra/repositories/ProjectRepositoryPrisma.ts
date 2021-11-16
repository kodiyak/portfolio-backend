import { generateUuid } from '../../helpers/generateUuid'
import { ProjectRepository } from '../../contracts/repositories'
import { Project } from '../../core/entities/Project'
import { prisma } from '../database/prisma/client'

export class ProjectRepositoryPrisma implements ProjectRepository {
  public async create(project: Project) {
    const slug = project.getAttribute('slug')
    const projectBySlug = await this.findBy('slug', slug)

    if (projectBySlug) {
      project.setAttribute('slug', `${slug}-${generateUuid()}`)
    }

    const data = await prisma.project.create({ data: project.toJSON() })
    return project.merge(data)
  }

  public async find(id: string): Promise<Project | undefined> {
    const data = await prisma.project.findFirst({ where: { id } })
    if (!data) {
      return undefined
    }
    return new Project(data)
  }

  public async findBy(field: keyof Project.Data, value: string): Promise<Project | undefined> {
    const data = await prisma.project.findFirst({ where: { [field]: value } })
    if (!data) {
      return undefined
    }

    return new Project(data)
  }
}
