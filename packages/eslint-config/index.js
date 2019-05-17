const { readConfig } = require('@rixo/eslint')

const CONFIG_FILE = __dirname + '/eslint.config.yml'

module.exports = readConfig(CONFIG_FILE)
