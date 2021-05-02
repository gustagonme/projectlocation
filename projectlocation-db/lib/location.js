'use strict'

module.exports = function setupLocation (LocationModel) {
  function findByUuid (uuid) {
    return LocationModel.findOne({
      where: {
        uuid
      }
    })
  }

  function findAll () {
    return LocationModel.findAll()
  }

  async function create (location) {
    const cond = {
      where: {
        uuid: location.uuid
      }
    }

    const existingLocation = await LocationModel.findOne(cond)

    if (existingLocation) {
      const res = {
        message: 'Ya existe una locación con este id único.'
      }
      return res
    }

    const result = await LocationModel.create(location)
    return result.toJSON()
  }

  return {
    findAll,
    create,
    findByUuid
  }
}
