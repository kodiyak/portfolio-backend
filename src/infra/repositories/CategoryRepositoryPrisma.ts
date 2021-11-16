import { CategoryRepository } from '@contracts/repositories'
import { Category } from '@core/entities/Category'
import { Project } from '@core/entities/Project'
import StrHelper from '@helpers/StrHelper'
import { prisma } from '@infra/database/prisma/client'

export class CategoryRepositoryPrisma implements CategoryRepository {
  public async create(category: Category) {
    category.setAttribute('slug', StrHelper.slug(category.getAttribute('title')))
    const categoryBySlug = await this.findBy('slug', category.getAttribute('slug'))
    if (categoryBySlug) {
      return category.merge(categoryBySlug.toJSON())
    }

    const categoryData = await prisma.category.create({ data: category.toJSON() })
    return category.merge(categoryData)
  }

  public async createMany(categories: Category[]) {
    for (const category of categories) {
      await this.create(category)
    }

    return categories
  }

  public async find(id: string): Promise<Category | undefined> {
    const data = await prisma.category.findFirst({ where: { id } })
    if (!data) {
      return undefined
    }
    return new Category(data)
  }

  public async findBy(field: keyof Category.Data, value: string): Promise<Category | undefined> {
    const data = await prisma.category.findFirst({ where: { [field]: value } })
    if (!data) {
      return undefined
    }

    return new Category(data)
  }

  public async getByProject(project: Project) {
    return prisma.category
      .findMany({
        where: { projects: { every: { id: project.getAttribute('id') } } },
      })
      .then((categories) => {
        return categories.map((category) => new Category(category))
      })
  }
}
