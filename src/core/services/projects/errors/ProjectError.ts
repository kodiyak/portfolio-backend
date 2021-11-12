import { Project } from '.prisma/client'

export class ProjectError extends Error {
  constructor(protected project: Project, message?: string) {
    super(message)
  }

  public getProject() {
    return this.project
  }
}
