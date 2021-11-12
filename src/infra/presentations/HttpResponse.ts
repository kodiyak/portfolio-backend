export class HttpResponse {
  protected status: HttpResponse.Status

  protected message: string

  protected code: number

  public setCode(code: number) {
    this.code = code
    return this
  }

  public getCode() {
    return this.code
  }

  public setMessage(message: string) {
    this.message = message
    return this
  }

  public getMessage() {
    return this.message
  }

  public setStatus(status: HttpResponse.Status) {
    this.status = status
    return this
  }

  public getStatus() {
    return this.status
  }

  private getProps() {
    const { message, code, status } = this
    return { message, code, status }
  }

  public toJSON() {
    return this.getProps()
  }

  public toString() {
    return JSON.stringify(this.toJSON())
  }
}

export namespace HttpResponse {
  export type Status = 'success' | 'error'
}
