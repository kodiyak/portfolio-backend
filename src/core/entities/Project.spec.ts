import { ProjectRepositoryPrisma } from '../../infra/repositories/ProjectRepositoryPrisma'
import { Category } from './Category'
import { Project } from './Project'

describe('Project Tests', () => {
  const project = new Project()
  const projectRepository = new ProjectRepositoryPrisma()

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
    await projectRepository.create(project)

    return expect(project.getAttribute('id')).not.toBeUndefined()
  })

  test('Add Categories in Project', async () => {
    await project.addCategories([
      new Category({ title: '🚀 Open Source' }),
      new Category({ title: '👨‍💻 In Progress' }),
      new Category({ title: '🌟 Private' }),
    ])

    return expect(project.getAttribute('categories').length).toBe(3)
  })
})
