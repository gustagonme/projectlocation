'use strict'

module.exports = {
  db:{
    database: process.env.DB_NAME || 'locationmanager',
    username: process.env.DB_USER || 'dbadmin',
    password: process.env.DB_PASS || 'vibesgood',
    host: process.env.DB_HOST || 'ec2-54-88-190-81.compute-1.amazonaws.com',
    port: process.env.DB_PORT || '5433',
    dialect: 'postgres',
    logging: (s) => console.log(s)
  }
}