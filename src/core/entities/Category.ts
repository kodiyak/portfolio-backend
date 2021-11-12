import { Entity } from './Entity'

export class Category extends Entity<Category.Data> {}

export namespace Category {
  export type Data = import('@prisma/client').Category
}
