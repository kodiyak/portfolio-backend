import { CategoryRepository } from '../../contracts/repositories'
import { Category } from '../../core/entities/Category'
import { prisma } from '../database/prisma/client'

export class CategoryRepositoryPrisma implements CategoryRepository {
  public async create(category: Category) {
    const categoryData = await prisma.category.create({
      data: category.toJSON(),
    })

    return category.merge(categoryData)
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
}
