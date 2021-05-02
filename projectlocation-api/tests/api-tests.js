'use strict'

const test = require('ava')
const request = require('supertest')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const locationFixtures = require('./fixtures/location')

let sandbox = null
let server = null
let dbStub = null
const LocationStub = {}

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()

  dbStub = sandbox.stub()
  dbStub.returns(Promise.resolve({
    Location: LocationStub
  }))

  LocationStub.findAll = sandbox.stub()
  LocationStub.findAll().returns(Promise.resolve(locationFixtures.all))

  const api = proxyquire('../api', {
    'projectlocation-db': dbStub
  })

  server = proxyquire('../server', {
    './api': api
  })
})

test.afterEach(() => {
  sandbox && sinon.restore()
})

test.serial.cb('/api/locations', t => {
  request(server)
    .get('/api/locations')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.falsy(err, 'should not return an error')
      const body = JSON.stringify(res.body)
      const expected = JSON.stringify(locationFixtures.connected)
      t.deepEqual(body, expected, 'response body should be the expected')
      t.end()
    })
})

test.serial.todo('/api/location/:uuid')
test.serial.todo('/api/location/:uuid - not found')


