import { Project } from '../../core/entities/Project'
import { ProjectRepository } from '../../core/repositories/ProjectRepository'
import { prisma } from '../database/prisma/client'

export class ProjectRepositoryPrisma implements ProjectRepository {
  public async create(data: Partial<Project.Data>) {
    const projectData = await prisma.project.create({
      data: {
        title: data.title,
        slug: data.slug,
        ...data,
      },
    })

    return new Project(projectData)
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
