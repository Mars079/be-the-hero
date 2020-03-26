/* eslint-disable no-undef */
const knex = require('knex');
const config = require('../../knexfile');

const connection = knex(config.development);

module.exports = connection;