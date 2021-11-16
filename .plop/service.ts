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
        choices: getDirectories(path.resolve(__dirname, '../src/core/modules'))
      },
      {
        type: 'confirm',
        name: 'shouldIncludeController',
        message: 'Include HTTP controller?',
        default: true,
      }
    ],
    actions: () => {
      return [
        {
          type: 'add',
          path: '../src/core/modules/{{ module }}/controllers/{{ pascalCase name }}Controller.ts',
          templateFile: 'templates/serviceController.stub.hbs',
          skipIfExists: true,
        },
        {
          type: 'add',
          path: '../src/core/modules/{{ module }}/services/{{ pascalCase name }}Service.ts',
          templateFile: 'templates/serviceClass.stub.hbs',
          skipIfExists: true,
        },
        {
          type: 'add',
          path: '../src/core/modules/{{ module }}/controllers/validators/{{ pascalCase name }}Validator.ts',
          templateFile: 'templates/serviceControllerValidator.stub.hbs',
          skipIfExists: true,
        }
      ]
    }
  })
}
