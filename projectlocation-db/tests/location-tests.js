'use strict'

const test = require('ava')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
const locationFixtures = require('./fixtures/location')


const config = {
    logging: function () {}
}

const single = Object.assign({}, locationFixtures.single)
let LocationStub = null
let db = null
let sandbox = null
const uuid = 2

const uuidArgs = {
    where: {
      uuid
    }
  }

const newLocation = {
    uuid: 5,
    name: 'test',
    address: 'test',
    area_m2: 15,
}

test.beforeEach(async () => {
    sandbox = sinon.createSandbox()
    LocationStub = {
        hasMany: sandbox.spy(),
        belongsTo: sinon.spy()
    }

    //Model create stub
    LocationStub.create = sandbox.stub()
    LocationStub.create.withArgs(newLocation).returns(Promise.resolve({
        toJson () { return newLocation }
    }))

    //Model FindOne stub
    LocationStub.findOne = sandbox.stub()
    LocationStub.findOne.withArgs(uuidArgs).returns(Promise.resolve(locationFixtures.byUuid(uuid)))

    //Model findAll stub
    LocationStub.findAll = sandbox.stub()
    LocationStub.findAll.withArgs().returns(Promise.resolve(locationFixtures.all))

    const setupDatabase = proxyquire('../', {
        './models/location': () => LocationStub
    })

    db = await setupDatabase(config)

})

test.afterEach(() => {
    sandbox && sandbox.restore()
})

test('Location', t => {
    t.truthy(db.Location, 'Location service should exists')
})

test.serial('Setup', t => {
    t.true(LocationStub.hasMany.called, 'LocationStub.hasMany was executed.')
    t.true(LocationStub.hasMany.calledWith(LocationStub), 'Argument should be the LocationModel')
    t.true(LocationStub.belongsTo.called, 'LocationStub.belongsTo was executed.')
    t.true(LocationStub.belongsTo.calledWith(LocationStub), 'Argument should be the LocationModel')
})

test.serial('Location#findAll', async t => {
    const locations = await db.Location.findAll()
  
    t.true(LocationStub.findAll.called, 'findAll should be called on model')
    t.true(LocationStub.findAll.calledOnce, 'findAll should be called once')
    t.true(LocationStub.findAll.calledWith(), 'findAll should be called without args')
  
    t.is(locations.length, locationFixtures.all.length, 'Locations should be the same')
    t.deepEqual(locations, locationFixtures.all, 'Locations should be the same')
})

test.serial('Location#create', async t => {
    const location = await db.Location.create(newLocation)
  
    t.true(LocationStub.findOne.called, 'findOne should be called on model')
    t.true(LocationStub.findOne.calledOnce, 'findOne should be called once')
    t.true(LocationStub.findOne.calledWith({
      where: { uuid: newLocation.uuid }
    }), 'findOne should be called with uuid args')
  
    t.true(LocationStub.create.called, 'create should be called on model')
    t.true(LocationStub.create.calledOnce, 'create should be called once')
    t.true(LocationStub.create.calledWith(newLocation), 'create should be called with newLocation args')
   
  })

  test.serial('Location#findByUuid', async t => {
    const location = await db.Location.findByUuid(uuid)
  
    t.true(LocationStub.findOne.called, 'findOne should be called on model')
    t.true(LocationStub.findOne.calledOnce, 'findOne should be called once')
    t.true(LocationStub.findOne.calledWith(uuidArgs), 'findOne should be called with uuid args')
  
    t.deepEqual(location, locationFixtures.byUuid(uuid), 'location should be the same')
  })
