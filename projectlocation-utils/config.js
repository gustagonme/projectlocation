'use strict'

module.exports = {
  db:{
    database: process.env.DB_NAME || 'locationmanager',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '5432',
    dialect: 'postgres',
    logging: (s) => console.log(s)
  }
}