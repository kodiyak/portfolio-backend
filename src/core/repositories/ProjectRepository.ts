import { Project } from '../entities/Project'
import { Repository } from './Repository'

export interface ProjectRepository extends Repository<Project.Data, Project> {}
