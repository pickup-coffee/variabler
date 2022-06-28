const fse = require('fs-extra')
const json = require('jsonfile')
const { logError } = require('./logger')
const { configPath } = require('./path')

const assert = (check, error) => {
  if (check) return

  logError(error)
  process.exit(1)
}
const assertExists = (path, error) => assert(checkExists(path), error)
const assertNotExists = (path, error) => assert(!checkExists(path), error)

const checkExists = path => fse.existsSync(path)

const copyDirectory = (source, destination) => {
  fse.ensureDirSync(destination)
  fse.copySync(source, destination)
}
const copyFile = (source, destination) => {
  fse.copyFileSync(source, destination)
}

const loadTemplatePaths = () => readJSON(configPath('templates.json'))
const loadVariablesConfig = () => readJSON(configPath('variables.json'))

const readFile = path => fse.readFileSync(path, 'utf-8')
const writeFile = (path, content) => {
  fse.ensureFileSync(path)
  fse.writeFileSync(path, content)
}

const readJSON = path => json.readFileSync(path)
const writeJSON = (path, content) => json.writeFileSync(path, content, { spaces: 2 })

module.exports = {
  assertExists,
  assertNotExists,
  checkExists,
  copyDirectory,
  copyFile,
  loadTemplatePaths,
  loadVariablesConfig,
  readFile,
  readJSON,
  writeFile,
  writeJSON
}