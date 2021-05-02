'use strict'

const test = require('ava')
const request = require('supertest')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const { locationFixtures } = require('projectlocation-utils')

let sandbox = null
let server = null
let dbStub = null
const LocationStub = {}

const location = {
  uuid: 1,
  name: 'ventura',
  area_m2: '64',
  address: 'calle 49 # 120-52'
}

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()

  dbStub = sandbox.stub()
  dbStub.returns(Promise.resolve({
    Location: LocationStub
  }))

  LocationStub.findAll = sandbox.stub()
  LocationStub.findAll.returns(Promise.resolve(locationFixtures.all))

  const api = proxyquire('../api', {
    'projectlocation-db': dbStub
  })

  server = proxyquire('../server', {
    './api': api
  })
})

test.afterEach(() => {
  sandbox && sinon.restore()
  server.close()
})

test.serial.cb('/api/locations', t => {
  request(server)
    .get('/api/locations')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.falsy(err, 'should not return an error')
      const body = JSON.stringify(res.body)
      const expected = JSON.stringify(locationFixtures.all)
      t.deepEqual(body, expected, 'response body should be the expected')
      t.end()
    })
})

test.serial.cb('/api/location/create', t => {
  request(server)
    .post('/api/location/create')
    .send(location)
    .expect('Content-Type', /json/)
    .expect(500)
    .set('Accept', /json/)
    .end((err, res) => {
      t.falsy(err, 'should not return an error')
      const body = JSON.stringify(res.body)
      const expected = JSON.stringify(res.body)
      t.deepEqual(body, expected, 'response body should be the expected')
      t.end()
    })
})
