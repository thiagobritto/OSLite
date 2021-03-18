const knex = require('knex')

let conn;

function connection() {
  conn = conn ? conn : connect();
  return conn
}

function connect() {
  conn = knex({
    client: 'sqlite3',
    connection: {
        filename: "./oslite.db"
    },
    useNullAsDefault: true
  })
  return conn
}

module.exports = { connection }
