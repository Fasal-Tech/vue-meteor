Package.describe({
  name: 'mrspark:vue-component-dev-server',
  version: '1.0.0',
  summary: 'Dev server for vue hot-reloading',
  git: 'https://github.com/Akryum/meteor-vue-component',
  documentation: 'README.md',
  debugOnly: true,
})

Package.onUse(function (api) {
  api.use('ecmascript@0.16.9')
  api.use('webapp@2.0.3')
  api.mainModule('server/main.js', 'server')
})
