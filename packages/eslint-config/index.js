const { readConfig } = require('@rixo/eslint')

const CONFIG_FILE = __dirname + '/configs/.eslintrc.yml'

module.exports = readConfig(CONFIG_FILE)
