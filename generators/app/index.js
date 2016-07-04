'use strict'
const yeoman = require('yeoman-generator')
const path = require('path')
const askName = require('inquirer-npm-name')
const camelCase = require('lodash.camelcase')
const chalk = require('chalk')
const yosay = require('yosay')

function makeLibraryName() {
  return path.basename(process.cwd())
}

module.exports = yeoman.Base.extend({
  initializing: {
    headling: function() {
      this.log(yosay(
        'Welcome to the finest ' + chalk.red('@ngryman/library') + ' generator!'
      ))
    },

    props: function() {
      this.props = {}
    }
  },

  prompting: {
    name: function() {
      return askName({
        name: 'name',
        message: 'Library name',
        default: makeLibraryName()
      }, this).then((answers) => {
        this.props.name = answers.name
        this.props.camelName = camelCase(answers.name)
      })
    },

    description: function() {
      return this.prompt([{
        type: 'input',
        name: 'description',
        message: 'Description'
      }]).then((answers) => {
        Object.assign(this.props, answers)
      })
    }
  },

  configuring: {
    dotfiles: function() {
      this.fs.copy(
        this.templatePath('.*'),
        this.destinationPath('.')
      )
    },

    package: function() {
      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'),
        this.props
      )
    }
  },

  writing: {
    source: function() {
      this.fs.copyTpl(
        this.templatePath('*.js'),
        this.destinationPath('.'),
        this.props
      )
    },

    readme: function() {
      this.fs.copyTpl(
        this.templatePath('readme.md'),
        this.destinationPath('readme.md'),
        this.props
      )
    },

    license: function() {
      this.fs.copy(
        this.templatePath('license'),
        this.destinationPath('license')
      )
    }
  },

  install: function() {
    this.npmInstall()
  }
})
