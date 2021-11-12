import { Project } from '@prisma/client'

export namespace ProjectRepository {
  export interface Create extends Partial<Project> {}
}

export interface ProjectRepository {
  create: (data: ProjectRepository.Create) => Promise<Project>
  find: (id: string) => Promise<Project | undefined>
  findBy: (field: keyof Project, value: string) => Promise<Project | undefined>
}
