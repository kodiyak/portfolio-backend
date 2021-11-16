export class Entity<T extends Record<any, any>> {
  public props: T = {} as T

  constructor(props?: Partial<T>) {
    this.setup(props)
  }

  protected setup(props?: Partial<T>) {
    if (props) {
      this.merge(props)
    }
  }

  public merge(props: Partial<T>) {
    this.props = {
      ...this.props,
      ...props,
    }

    return this
  }

  public setAttribute<K extends keyof T>(key: K, value: T[K]) {
    this.props[key] = value

    return this
  }

  public getAttribute<K extends keyof T>(key: K): T[K] {
    return this.props[key]
  }

  public toString() {
    return JSON.stringify(this.props)
  }

  public toJSON() {
    return this.props
  }
}
