import { ProjectRepository } from '../../core/repositories/ProjectsRepository'
import { prisma } from '../database/prisma/client'

export class ProjectRepositoryPrisma implements ProjectRepository {
  public async create(data: ProjectRepository.Create) {
    if (!data.title || !data.slug) {
      throw new Error('Project title & slug is required')
    }

    const project = await prisma.project.create({
      data: {
        title: data.title,
        slug: data.slug,
        ...data,
      },
    })
    return project
  }
}
