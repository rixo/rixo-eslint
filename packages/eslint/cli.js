#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const encoding = 'utf8'

const requiredFiles = ['.eslintrc', '.prettierrc']
const optionalFiles = ['.eslintrc.js']
const files = [...requiredFiles, ...optionalFiles]

// more specific first!
const sortedModulesWithTemplates = [
  '@rixo/eslint-config-svelte-native',
  '@rixo/eslint-config-svelte',
  '@rixo/eslint-config-atom',
  '@rixo/eslint-config',
  '@rixo/eslint',
]

const resolveTargets = async () => {
  const resolved = {}
  for (const moduleName of sortedModulesWithTemplates) {
    try {
      const index = require.resolve(moduleName)
      if (!index) return
      const dir = path.dirname(index)
      const templates = `${dir}/templates`
      for (const file of files) {
        if (!resolved[file]) {
          const path = `${templates}/${file}`
          const exists = fs.existsSync(path)
          if (exists) {
            // console.info(`Found ${file} in ${moduleName}: ${path}`)
            const contents = await readTpl(path)
            resolved[file] = { file, moduleName, contents }
            const allResolved = Object.keys(resolved).length === files.length
            if (allResolved) {
              return resolved
            }
          }
        }
      }
    } catch (err) {
      // rethrow unexpected errors
      if (!/Error: Cannot find module/.test(err)) {
        throw err
      }
      // console.debug(`Optional module not found: ${moduleName}`)
    }
  }
  return resolved
}

const writeFile = (path, contents) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, contents, encoding, err => {
      if (err) reject(err)
      else resolve()
    })
  })

const resolveAppRoot = () => {
  const steps = __dirname.split('/')
  steps.pop()
  while (steps.length) {
    const path = [...steps].join('/') || '/'
    steps.pop()
    const found =
      fs.existsSync(`${path}/package.json`) ||
      fs.existsSync(`${path}/node_modules`)
    if (found) {
      return path
    }
  }
}

const writeTarget = async ({ file, moduleName, contents }) => {
  const cwd = resolveAppRoot()
  if (!cwd) {
    throw new Error('Failed to find project root from: ' + __dirname)
  }
  const target = `${cwd}/${file}`
  if (fs.existsSync(target)) {
    console.info(`Skip creating existing file: ${file}`)
    return
  }
  await writeFile(target, contents)
  console.info(`Written ${file} (from ${moduleName})`)
}

const writeTargets = resolvedTargets => {
  const targets = Object.values(resolvedTargets)
  return Promise.all(targets.map(writeTarget))
}

const readTpl = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, { encoding }, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })

const warnMissingFiles = targets => {
  requiredFiles.forEach(file => {
    if (!targets[file]) {
      console.warn(`No suitable ${file} found in your installed module`)
      console.info(`${file} won't be automatically created`)
    }
  })
  return targets
}

Promise.resolve()
  .then(resolveTargets)
  .then(warnMissingFiles)
  .then(writeTargets)
  .catch(err => {
    console.error(err)
    process.exit(255)
  })
