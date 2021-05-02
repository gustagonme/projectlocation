'user strict'

const debug = require('debug')('projectlocation:api:routes')
const express = require('express')
const asyncify = require('express-asyncify')
const db = require('projectlocation-db')
const config = require('./config')
const api = asyncify(express.Router())

let services, Location

api.use(express.json())
api.use(express.urlencoded({
    extended:true
}))

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
    locations = await Location.findAll()
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

api.post('/location/create', async (req, res, next) => {
  debug('request to /location/create')

  let location

  try {
    location = await Location.create(req.body)
  } catch (e) {
    return next(e)
  }

  if (!location) {
    return next(new Error('No se pudo crear el usuario, por favor consulte con su administrador.'))
  }

  res.send(location)
})

module.exports = api
