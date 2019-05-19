const { readConfig } = require('@rixo/eslint')

const CONFIG_FILE = __dirname + '/configs/.eslintrc'

module.exports = readConfig(CONFIG_FILE)
