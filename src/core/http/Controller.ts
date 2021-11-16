import { HttpResponse } from './HttpResponse'

export abstract class Controller<T = any> {
  public abstract handle(data: T): Promise<HttpResponse>
}
