import { HttpResponse } from './HttpResponse'

export class HttpError extends HttpResponse {
  constructor(message?: string) {
    super()
    this.setMessage(message).setStatus('error')
  }
}
