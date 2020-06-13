const knex = require('knex');
const dotenv = require('dotenv')

const result = dotenv.config()
if (result.error) {
  throw result.error
}

const knexConfig = require('../knexfile.js');

const environment = process.env.NODE_ENV || 'development'

console.log(environment)
module.exports = knex(knexConfig[environment]);