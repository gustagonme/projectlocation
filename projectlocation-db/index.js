'use strict'

const setupDatabase = require('./lib/db')
const setupLocation = require('./lib/location')
const setupLocationModel = require('./models/location')
const defaults = require('defaults')

module.exports = async function (config) {
  config = defaults(config, {
    dialect: 'sqlite',
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    },
    query: {
      raw: true
    }
  })

  const sequelize = setupDatabase(config)
  const LocationModel = setupLocationModel(config)

  LocationModel.hasMany(LocationModel, {as: 'children', foreignKey: 'parent_location_id'})
  LocationModel.belongsTo(LocationModel, {as: 'parent', foreignKey: 'parent_location_id'})

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const Location = setupLocation(LocationModel)

  return {
    Location
  }
}
