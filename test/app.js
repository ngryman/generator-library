import test from 'ava'
import path from 'path'
import assert from 'yeoman-assert'
import helpers from 'yeoman-test'

const prompts = {
  name: 'awesome library',
  camelName: 'awesomeLibrary',
  startName: 'Awesome Library',
  description: 'Obviously awesome!'
}

test.before(t => {
  return helpers.run(path.join(__dirname, '../generators/app'))
    .withPrompts(prompts)
    .toPromise()
})

test('create dotfiles', t => {
  assert.file([
    '.editorconfig',
    '.eslintrc',
    '.gitattributes',
    '.gitignore',
    '.travis.yml'
  ])
})

test('create a package.json', t => {
  assert.fileContent('package.json', new RegExp(`"name": "${prompts.name}"`))
  assert.fileContent('package.json', new RegExp(`"description": "${prompts.description}"`))
})

test('create index.js', t => {
  assert.fileContent('index.js', new RegExp(`function ${prompts.camelName}`))
  assert.fileContent('index.js', new RegExp(`module.exports = ${prompts.camelName}`))
})

test('create test.js', t => {
  assert.fileContent('test.js', new RegExp(`import ${prompts.camelName} from '../'`))
  assert.fileContent('test.js', new RegExp(`${prompts.camelName}()`))
})

test('create license', t => {
  assert.file('license')
})
