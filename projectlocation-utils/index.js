'use strict'
if (process.env.NODE_ENV !== 'production') require('longjohn')
const {parsePayload, pipe, handleFatalError} = require('./utils')
const config = require('./config')
const locationFixtures = require('./tests/fixtures/location')
module.exports = {
    config,
    parsePayload,
    pipe,
    handleFatalError,
    locationFixtures
}