import { ProjectRepository } from '@contracts/repositories'

export class ShowProjectService {
  constructor(protected projectRepository: ProjectRepository) {}

  public async handle(data: ShowProjectService.Data) {
    return this.projectRepository.findBy('id', data.id)
  }
}

export namespace ShowProjectService {
  export type Data = {
    id: string
  }
}
