import { Project } from '../entities/Project'

export namespace ProjectRepository {
  export interface Create extends Partial<import('@prisma/client').Project> {}
}

export interface ProjectRepository {
  create: (data: ProjectRepository.Create) => Promise<Project>
  find: (id: string) => Promise<Project | undefined>
  findBy: (
    field: keyof import('@prisma/client').Project,
    value: string
  ) => Promise<Project | undefined>
}
