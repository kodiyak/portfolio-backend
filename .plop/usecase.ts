import { NodePlopAPI } from 'plop'
import { readdirSync } from 'fs';
import path from 'path'

const getDirectories = (source: string) =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

export default function (plop: NodePlopAPI) {
  plop.setGenerator('usecase', {
    description: 'Build Usecase with Api Route',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Name',
      },
      {
        type: 'list',
        name: 'module',
        message: 'Module',
        choices: getDirectories(path.resolve(__dirname, '../src/core/services'))
      },
      {
        type: 'confirm',
        name: 'shouldIncludeController',
        message: 'Include HTTP controller?',
        default: true,
      },
    ],
    actions: (answares) => {
      console.log('answares', answares)
      return []
    }
  })
}
