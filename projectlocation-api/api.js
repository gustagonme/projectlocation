'user strict'

const debug = require('debug')('projectlocation:api:routes')
const express = require('express')
const asyncify = require('express-asyncify')
const db = require('projectlocation-db')
const config  = require('./config')
const api = asyncify(express.Router())

let services, Location

api.use('*', async (req, res, next) => {
  if (!services) {
    debug('Connecting to database')
    try {
      services = await db(config.db)
    } catch (e) {
      return next(e)
    }

    Location = services.Location
  }
  next()
})

api.get('/locations', async (req, res, next) => {
  debug('A request has come to /locations')

  let locations = []
  try {
    agents = await Location.findAll()
  } catch (e) {
    return next(e)
  }

  res.send(locations)
})

api.get('/location/:uuid', async (req, res, next) => {
  const { uuid } = req.params

  debug(`request to /location/${uuid}`)

  let location
  try {
    location = await Location.findByUuid(uuid)
  } catch (e) {
    return next(e)
  }

  if (!location) {
    return next(new Error(`Location not found with uuid ${uuid}`))
  }

  res.send(location)
})


module.exports = api


