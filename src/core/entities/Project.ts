import { Entity } from './Entity'

export class Project extends Entity<Project.Data> {
  public async addCategory(category: string) {}
}

export namespace Project {
  export type Data = import('@prisma/client').Project
}
