import { Entity } from '../entities/Entity'

export interface Repository<P extends Record<any, any>, E extends Entity<P>> {
  create: (data: Partial<P>) => Promise<E>
  find: (id: string) => Promise<E | undefined>
  findBy: (field: keyof P, value: string) => Promise<E | undefined>
}
