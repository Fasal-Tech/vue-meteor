Package.describe({
  name: 'mrspark:vue-sass',
  version: '1.0.2',
  summary: 'Add sass and scss support for vue components',
  git: 'https://github.com/Akryum/meteor-vue-component',
  documentation: 'README.md',
})

Package.registerBuildPlugin({
  name: 'vue-component-sass',
  use: [
    'ecmascript@0.16.9',
  ],
  sources: [
    'vue-sass.js',
  ],
  npmDependencies: {
    'sass': '1.80.6',
    'meteor-project-path': '0.0.3',
  },
})

Package.onUse(function (api) {
  api.use('isobuild:compiler-plugin@1.0.0')
})
