const pageExists = require('./pageExists')

module.exports = (plop) => {
    // create your generators here
  plop.setGenerator('page', {
    description: 'Generate new page',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What should it be called?',
        default: 'AboutUs',
        validate: (value) => {
          if ((/.+/).test(value)) {
            return pageExists(value) ? 'A page with this name already exists' : true
          }

          return 'The name is required'
        },
      },
      {
        type: 'input',
        name: 'path',
        message: 'Its route?',
        default: 'about-us',
        // validate: () => 'Path is required',
      },
      {
        type: 'confirm',
        name: 'useState',
        default: false,
        message: 'Do you want to use state (will add actions, reducers, selectors) in this page?',
      },
    ],
    actions: (data) => {
      const { useState } = data
      const actions = [
        {
          type: 'add',
          path: '../pages/{{properCase name}}/index.js',
          templateFile: './templates/index.js.hbs',
          abortOnFail: true,
        },
        {
          type: 'add',
          path: '../pages/{{properCase name}}/{{properCase name}}.js',
          templateFile: './templates/Page.js.hbs',
          abortOnFail: true,
        },
        // Modify global reducer
        // Modify server.js
      ]
      if (useState) {
        actions.push({
          type: 'add',
          path: '../pages/{{properCase name}}/constants.js',
          templateFile: './templates/constants.js.hbs',
          abortOnFail: true,
        })
        actions.push({
          type: 'add',
          path: '../pages/{{properCase name}}/actions.js',
          templateFile: './templates/actions.js.hbs',
          abortOnFail: true,
        })
        actions.push({
          type: 'add',
          path: '../pages/{{properCase name}}/reducer.js',
          templateFile: './templates/reducer.js.hbs',
          abortOnFail: true,
        })
        actions.push({
          type: 'add',
          path: '../pages/{{properCase name}}/selectors.js',
          templateFile: './templates/selectors.js.hbs',
          abortOnFail: true,
        })
        actions.push({
          type: 'modify',
          path: '../server.js',
          pattern: /\/\/ Add new route here/,
          template: "server.get('/{{path}}', (req, res) => app.render(req, res, '/{{properCase name}}', req.query))\n    // Add new route here",
        })
        actions.push({
          type: 'modify',
          path: '../reducer.js',
          pattern: /\/\/ Add new reducer here/,
          template: "import {{camelCase name}} from 'pages/{{properCase name}}/reducer'\n// Add new reducer here",
        })
        actions.push({
          type: 'modify',
          path: '../reducer.js',
          pattern: /\/\/ Use new reducer here/,
          template: '{{camelCase name}},\n  // Use new reducer here',
        })
      }
      return actions
    },
  })
}
