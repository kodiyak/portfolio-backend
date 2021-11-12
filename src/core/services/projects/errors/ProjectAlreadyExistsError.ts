import { Project } from '.prisma/client'
import { ProjectError } from './ProjectError'

export class ProjectAlreadyExistsError extends ProjectError {
  constructor(project: Project) {
    super(project, `Project with slug ${project.slug} already exists`)
  }
}
