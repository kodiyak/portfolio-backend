import { Category } from '../core/entities/Category'
import { Entity } from '../core/entities/Entity'
import { Project } from '../core/entities/Project'

export interface Repository<P extends Record<any, any>, E extends Entity<P>> {
  create: (data: Partial<P>) => Promise<E>
  find: (id: string) => Promise<E | undefined>
  findBy: (field: keyof P, value: string) => Promise<E | undefined>
}

export interface CategoryRepository extends Repository<Category.Data, Category> {
  findOrCreate: (data: Partial<Category.Data>) => Promise<Category>
}

export interface ProjectRepository extends Repository<Project.Data, Project> {}
