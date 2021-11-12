import { Project } from '.prisma/client'
import { ProjectRepository } from '../../core/repositories/ProjectsRepository'
import { prisma } from '../database/prisma/client'

export class ProjectRepositoryPrisma implements ProjectRepository {
  public async create(data: ProjectRepository.Create) {
    const project = await prisma.project.create({
      data: {
        title: data.title,
        slug: data.slug,
        ...data,
      },
    })
    return project
  }

  public async find(id: string): Promise<Project | undefined> {
    const project = await prisma.project.findFirst({ where: { id } })
    return project
  }

  public async findBy(field: keyof Project, value: string): Promise<Project | undefined> {
    const project = await prisma.project.findFirst({ where: { [field]: value } })
    return project
  }
}
