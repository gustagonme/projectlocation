'use strict'

const debug = require('debug')('projectlocation:db:setup')
const inquirer = require('inquirer')
const chalk = require('chalk')
const db = require('./')

const prompt = inquirer.createPromptModule()

async function setup () {
  const byPass = process.argv.indexOf('yes') !== -1

  if (!byPass) {
    const answer = await prompt([
      {
        type: 'confirm',
        name: 'setup',
        message: 'Are you sure to destroy the database?'
      }
    ])

    if (!answer.setup) {
      return console.log('Nothing happend.')
    }
  }

  const config = {
    database: process.env.DB_NAME || 'locationmanager',
    username: process.env.DB_USER || 'dbadmin',
    password: process.env.DB_PASS || 'vibesgood',
    host: process.env.DB_HOST || 'ec2-54-88-190-81.compute-1.amazonaws.com',
    port: process.env.DB_PORT || '5433',
    dialect: 'postgres',
    logging: s => debug(s),
    setup: true
  }
  await db(config).catch(handleFatalError)

  console.log('Success!')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()
