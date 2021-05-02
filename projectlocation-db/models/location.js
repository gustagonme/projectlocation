'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupLocationModel (config) {
  const sequelize = setupDatabase(config)

  const location = sequelize.define('location', {
    uuid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    area_m2: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true
    },
    parent_location_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  })

  location.belongsTo(location, { foreignKey: 'fk_uuid', targetKey: 'parent_location_id' })

  return location
}
