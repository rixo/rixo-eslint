#!/usr/bin/env node

const fs = require('fs')

const encoding = 'utf8'
const cwd = process.cwd()
const files = ['.eslintrc', '.prettierrc']

if (process.argv[2] !== 'init') {
  console.log('Usage: rixo-eslint init')
  process.exit(1)
}

const write = (file, contents) =>
  new Promise((resolve, reject) => {
    fs.writeFile(`${cwd}/${file}`, contents, encoding, err => {
      if (err) reject(err)
      else resolve()
    })
  })

const readTpl = file =>
  new Promise((resolve, reject) => {
    fs.readFile(
      `${__dirname}/./templates/${file}`,
      { encoding },
      (err, data) => {
        if (err) reject(err)
        else resolve(data)
      }
    )
  })

const processFile = async file => {
  const contents = await readTpl(file)
  await write(file, contents)
  console.info(`Written: ${file}`)
}

Promise.all(files.map(processFile))
  .then(() => console.log('OK'))
  .catch(err => {
    console.error(err)
    process.exit(255)
  })
