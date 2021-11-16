import { Category } from './Category'
import { Entity } from './Entity'

export class Project extends Entity<Project.Data> {
  public async addCategory(category: Category) {
    console.log('category', category)
  }
}

export namespace Project {
  export type Data = import('@prisma/client').Project
}
