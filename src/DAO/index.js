const knex = require('knex')

let conn;

function connection(db) {
  conn = conn ? conn : connect(db);
  return conn
}

function connect(db) { 
  conn = knex({
    client: 'sqlite3',
    connection: {
        filename: `./src/databases/${db?db:'oslite'}.db`
    },
    useNullAsDefault: true
  })
  return conn
}

module.exports = { connection }
