'use strict'

const location = {
    uuid: 1,
    name: 'ventura',
    area_m2: '64',
    address: 'calle 49 # 120-52'
}

const locations = [
    location,
    extend(location, { uuid: 2, name: 'acuarela' }),
    extend(location, { uuid: 3, name: 'aguaclara' })
]

function extend (obj, values){
    const clone = Object.assign({}, obj)
    return Object.assign(clone, values)
}

module.exports = {
    single: location,
    all: locations,
    name: locations.filter(a=>a.name==='ventura'),
    byUuid: id=>locations.filter(a=>a.uuid === id).shift()
}