Package.describe({
  name: 'mrspark:vue',
  version: '1.0.1',
  summary: 'Integrate Vue with Meteor',
  git: 'https://github.com/Akryum/meteor-vue-component',
  documentation: 'README.md',
})

Package.onUse(function (api) {
  api.versionsFrom('3.0.4')
  api.use('mrspark:npm-check@1.0.1')
  api.use('ecmascript')
  api.mainModule('index.js', 'client')
  api.export('Vue', 'client')
})

Npm.depends({
  'lodash.omit': '4.5.0',
})
