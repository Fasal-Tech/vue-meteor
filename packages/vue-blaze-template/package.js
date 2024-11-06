Package.describe({
  name: 'mrspark:vue-blaze-template',
  version: '1.0.0',
  summary: 'Render Blaze templates in vue components',
  git: 'https://github.com/Akryum/meteor-vue-component',
  documentation: 'README.md',
})

Package.onUse(function (api) {
  api.versionsFrom('3.0.4')
  api.use([
    'ecmascript',
    'templating@1.4.4',
    'blaze@3.0.0',
  ])
  api.mainModule('vue-render-blaze.js', 'client')
})
