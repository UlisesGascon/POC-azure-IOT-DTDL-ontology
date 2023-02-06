const { createParser, ModelParsingOption } = require('@azure/dtdl-parser')

const { statSync, readdirSync, readFileSync } = require('fs')
const { join } = require('path')

const isDirectory = path => statSync(path).isDirectory()

const getDirectories = path =>
  readdirSync(path).map(name => join(path, name)).filter(isDirectory)

const isFile = path => statSync(path).isFile()
const getFiles = path =>
  readdirSync(path).map(name => join(path, name)).filter(isFile)

const getFilesRecursively = (path) => {
  const dirs = getDirectories(path)
  const files = dirs
    .map(dir => getFilesRecursively(dir))
    .reduce((a, b) => a.concat(b), [])
  return files.concat(getFiles(path)).filter(file => file.endsWith('.json'))
}

const getAllModels = async () => {
  const modelFiles = getFilesRecursively(join(process.cwd(), './ontology'))
  const models = modelFiles.map(file => readFileSync(file, 'utf8'))
  const modelParser = createParser(ModelParsingOption.PermitAnyTopLevelElement)
  modelParser.options = ModelParsingOption.PermitAnyTopLevelElement
  return modelParser.parse(models)
}

module.exports = {
  getAllModels
}
