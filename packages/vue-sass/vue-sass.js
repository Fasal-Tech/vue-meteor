import path from 'path'
import fs from 'fs'
import sass from 'sass'

global.vue = global.vue || {}
global.vue.lang = global.vue.lang || {}

function resolveImport (dependencyManager) {
  return function (url, prev, done) {
    let resolvedFilename
    url = url.replace(/^["']?(.*?)["']?$/, '$1')
    if (url.indexOf('~') === 0 || url.indexOf('/') === 0) {
      resolvedFilename = url.substr(1)
    /* } else if (url.indexOf('{') === 0) {
      resolvedFilename = decodeFilePath(url) */
    } else {
      let currentDirectory = path.dirname(prev === 'stdin' ? this.options.outFile : prev)
      resolvedFilename = path.resolve(currentDirectory, url)
    }
    const importPaths = [resolvedFilename]
    const pkg = require('package.json') // can not be moved outside. Reqired here to get the package.json of the project that is being run

    try {
      // get the package.json config option and create paths for the requested file.
      pkg.vue.css.sass.includePaths.forEach((str) => {
        importPaths.push(path.resolve(str, url))
      })
    } catch (e) {
      // Ignore error. package.json option is not set.
    }

    const resolvedNames = importPaths.map(discoverImportPath).filter(
      fileName => fileName !== null && typeof fileName !== 'undefined'
    )

    if (resolvedNames.length < 1) {
      done(new Error('Unknown import (file not found): ' + url))
    } else {
      dependencyManager.addDependency(resolvedNames[0])

      done({
        file: resolvedNames[0],
      })
    }
  }
}

function discoverImportPath (importPath) {
  const potentialPaths = [importPath]
  const potentialFileExtensions = ['scss', 'sass']

  if (!path.extname(importPath)) {
    potentialFileExtensions.forEach(extension => potentialPaths.push(`${importPath}.${extension}`))
  }
  if (path.basename(importPath)[0] !== '_') {
    [].concat(potentialPaths).forEach(potentialPath => potentialPaths.push(`${path.dirname(potentialPath)}/_${path.basename(potentialPath)}`))
  }

  for (let i = 0, potentialPath = potentialPaths[i]; i < potentialPaths.length; i++, potentialPath = potentialPaths[i]) {
    if (fs.existsSync(potentialPaths[i]) && fs.lstatSync(potentialPaths[i]).isFile()) {
      return potentialPath
    }
  }

  return null
}

// function decodeFilePath (filePath) {
//   const match = filePath.match(/^{(.*)}\/(.*)$/)
//   if (!match)
//     {throw new Error('Failed to decode Sass path: ' + filePath)}

//   if (match[1] === '') {
//     // app
//     return match[2]
//   }

//   return 'packages/' + match[1] + '/' + match[2]
// }

global.vue.lang.scss = function ({
  source,
  basePath,
  inputFile,
  dependencyManager,
}) {
  if (!source.trim()) {
    return
  }
  return sass.renderSync({
    silenceDeprecations: ['legacy-js-api'],
    data: source,
    importer: resolveImport(dependencyManager),
    outFile: inputFile.getPathInPackage() + '.css',
    sourceMap: true,
    sourceMapContents: true,
  })
}

global.vue.lang.sass = function ({
  source,
  basePath,
  inputFile,
  dependencyManager,
}) {
  if (!source.trim()) {
    return
  }
  return sass.renderSync({
    silenceDeprecations: ['legacy-js-api'],
    data: source,
    importer: resolveImport(dependencyManager),
    outFile: basePath + '.css',
    sourceMap: true,
    sourceMapContents: true,
    indentedSyntax: true,
  })
}
