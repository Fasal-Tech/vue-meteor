Package.describe({
  name: 'mrspark:vue-component-dev-client',
  version: '1.0.0',
  summary: 'Hot-reloading client for vue components',
  git: 'https://github.com/Akryum/meteor-vue-component',
  documentation: 'README.md',
  debugOnly: true,
})

Package.onUse(function (api) {
  api.use('ecmascript@0.16.9')
  api.use('reload@1.3.2')
  api.use('autoupdate@2.0.0')
  api.mainModule('client/dev-client.js', 'client')
})

Npm.depends({
  'socket.io-client': '2.2.0',
})
