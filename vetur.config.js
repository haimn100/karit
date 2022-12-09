// vetur.config.js
/** @type {import('vls').VeturConfig} */
module.exports = {
    // **optional** default: `{}`
    // override vscode settings
    // Notice: It only affects the settings used by Vetur.
    settings: {
      "vetur.useWorkspaceDependencies": true,
      "vetur.experimental.templateInterpolationService": false,
      "eslint.validate": [
        "javascript",
        "vue"
      ]
    },
    // **optional** default: `[{ root: './' }]`
    // support monorepos
    projects: [
      './website', // Shorthand for specifying only the project root location
    ]
  }