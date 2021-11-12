import { Project } from '@prisma/client'

export namespace ProjectRepository {
  export interface Create extends Partial<Project> {}
}

export interface ProjectRepository {
  create: (data: ProjectRepository.Create) => Promise<Project>
}
