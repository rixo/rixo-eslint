const fs = require('fs')
const yaml = require('js-yaml')

const defaultEncoding = 'utf8'

exports.readConfig = (file, opts = defaultEncoding) => {
  const contents = fs.readFileSync(file, opts)
  const config = yaml.safeLoad(contents)
  return config
}
