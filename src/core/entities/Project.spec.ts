import { ProjectRepositoryPrisma } from '../../infra/repositories/ProjectRepositoryPrisma'
import { Project } from './Project'

describe('Project Tests', () => {
  const project = new Project()
  beforeEach(() => {
    project.setAttribute('title', 'Project Test')
    project.setAttribute('slug', 'project-test')
    project.setAttribute('repositoryUrl', 'http://localhost:3300')
    project.setAttribute('releasedAt', new Date())
    project.setAttribute('isPublic', false)
  })

  test('Create a Simple Project', () => {
    return expect(project.getAttribute('isPublic')).toBe(false)
  })

  test('Persist a Project', async () => {
    const repository = new ProjectRepositoryPrisma()
    await repository.create(project)

    return expect(project.getAttribute('id')).not.toBeUndefined()
  })
})
