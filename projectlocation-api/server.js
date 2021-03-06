'use strict'

const debug = require('debug')('projectlocation:api')
const chalk = require('chalk')
const http = require('http')
const asyncify = require('express-asyncify')
const express = require('express')

const api = require('./api')

const port = process.env.PORT || 3000
const app = asyncify(express())
const server = http.createServer(app)

app.use('/api', api)

// Express error handler
app.use((err, req, res, next) => {
  debug(`Error: ${err.message}`)

  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message })
  }

  res.status(500).send({ error: err.message })
})

function handleFatalerror (err) {
  console.error(`${chalk.red('[fatal error')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

if (!module.main) {
  process.on('uncaughtException', handleFatalerror)
  process.on('unhandledRejection', handleFatalerror)

  server.listen(port, () => {
    console.log(`${chalk.green('[projectlocation-api]')} server listening on port ${port}`)
  })
}

module.exports = server
