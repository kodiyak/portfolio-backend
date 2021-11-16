import { ProjectRepository } from '@contracts/repositories'
import { Category } from '@core/entities/Category'
import { Project } from '@core/entities/Project'
import { generateUuid } from '@helpers/generateUuid'
import { prisma } from '@infra/database/prisma/client'

export class ProjectRepositoryPrisma implements ProjectRepository {
  public async create(project: Project) {
    const slug = project.getAttribute('slug')
    const projectBySlug = await this.findBy('slug', slug)

    if (projectBySlug) {
      project.setAttribute('slug', `${slug}-${generateUuid()}`)
    }

    const data = await prisma.project.create({
      data: {
        ...project.toJSON(),
        categories: undefined,
      },
    })
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

  public async addCategories(project: Project, categories: Category[]) {
    await prisma.project.update({
      where: { id: project.getAttribute('id') },
      data: {
        ...project.toJSON(),
        categories: {
          connect: categories.map((category) => ({ id: category.getAttribute('id') })),
        },
      },
    })

    return categories
  }
}
