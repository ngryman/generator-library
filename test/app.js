'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

const prompts = {
  name: 'awesome library',
  camelName: 'awesomeLibrary',
  startName: 'Awesome Library',
  description: 'Obviously awesome!'
}

describe('generator-ngryman-generator-library:app', () => {
  before(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts(prompts)
      .toPromise()
  })

  it('create dotfiles', () => {
    assert.file([
      '.editorconfig',
      '.eslintrc',
      '.gitattributes',
      '.gitignore',
      '.travis.yml'
    ])
  })

  it('create a package.json', () => {
    assert.fileContent('package.json', new RegExp(`"name": "${prompts.name}"`))
    assert.fileContent('package.json', new RegExp(`"description": "${prompts.description}"`))
  })

  it('create index.js', () => {
    assert.fileContent('index.js', new RegExp(`function ${prompts.camelName}`))
    assert.fileContent('index.js', new RegExp(`module.exports = ${prompts.camelName}`))
  })

  it('create test.js', () => {
    assert.fileContent('test.js', new RegExp(`import ${prompts.camelName} from '../'`))
    assert.fileContent('test.js', new RegExp(`${prompts.camelName}()`))
  })

  it('create license', () => {
    assert.file('license')
  })
})
