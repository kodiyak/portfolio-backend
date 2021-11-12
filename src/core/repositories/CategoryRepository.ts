import { Category } from '../entities/Category'
import { Repository } from './Repository'

export interface CategoryRepository extends Repository<Category.Data, Category> {}
