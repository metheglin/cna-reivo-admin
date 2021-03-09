const pascalCase = require('pascal-case')
const snakeCase = require('snake-case')
const titleCase = require('title-case')
const pluralize = require('pluralize')

const scopeCase = (text, options)=>text.split('/').map(x=>pascalCase(x)).join('/')
const urlCase = (text, options)=>text.split('/').map(x=>snakeCase(x)).join('/')

module.exports = plop => {
  // https://handlebarsjs.com/guide/expressions.html#helpers
  plop.setHelper('scopeCase', scopeCase);
  plop.setHelper('urlCase', urlCase);

  plop.setGenerator('pages', {
    description: 'Create CRUD pages',
    prompts: [
      {
        type: 'input',
        name: 'inputName',
        message: 'What is your page subject name? ex: blog',
      },
      {
        type: 'input',
        name: 'inputPathPrefix',
        message: 'What is the page path prefix? ex: /blogs',
        default: null,
      },
      {
        type: 'input',
        name: 'inputApiPrefix',
        message: 'What is the api path prefix? ex: /api/blogs',
        default: null,
      },
    ],
    actions: ({inputName, inputPathPrefix, inputApiPrefix}) => {
      const name        = snakeCase(pluralize(inputName))
      const pathPrefix  = inputPathPrefix ? inputPathPrefix : `/${urlCase(name)}`
      const apiPrefix   = inputApiPrefix ? inputApiPrefix : `/${urlCase(name)}`
      const data  = {name, pathPrefix, apiPrefix}
      console.log(data)

      const presetComponents = ['index', 'Form', 'MainDashBar', 'SubDashBar']
      const actionsPresetComponents = presetComponents.map(filename=>({
        type: 'add',
        path: `components${pathPrefix}/${filename}.js`,
        templateFile: `plop-templates/preset_components/${filename}.js.hbs`,
        skipIfExists: true,
        data: data,
      }))
      const pages = ['index', 'new', '[id]']
      const actionsPages = pages.map(filename=>({
        type: 'add',
        path: `pages${pathPrefix}/${filename}.js`,
        templateFile: `plop-templates/pages/${filename}.js.hbs`,
        skipIfExists: true,
        data: data,
      }))

      return actionsPresetComponents.concat(actionsPages)
    }
  })
};