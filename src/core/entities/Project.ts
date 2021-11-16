import { CategoryRepositoryPrisma } from '../../infra/repositories/CategoryRepositoryPrisma'
import { ProjectRepositoryPrisma } from '../../infra/repositories/ProjectRepositoryPrisma'
import { Category } from './Category'
import { Entity } from './Entity'

export class Project extends Entity<Project.Data> {
  constructor(
    props?: Partial<Project.Data>,
    protected categoryRepository = new CategoryRepositoryPrisma(),
    protected projectRepository = new ProjectRepositoryPrisma()
  ) {
    super(props)
  }

  public async addCategories(categories: Category[]) {
    await this.categoryRepository.createMany(categories)
    await this.projectRepository.addCategories(this, categories)

    this.setAttribute('categories', categories)
  }

  public async fetchCategories() {
    const categories = await new CategoryRepositoryPrisma().getByProject(this)
    this.setAttribute('categories', categories)

    return this.getAttribute('categories')
  }
}

export namespace Project {
  export type Data = import('@prisma/client').Project & { categories: Category[] }
}
