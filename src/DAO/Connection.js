const knex = require('knex')

class Connection {
  constructor() {
    this._conn = knex({
      client: 'sqlite3',
      connection: {
          filename: "./oslite.db"
      },
      useNullAsDefault: true
    })
    return this._conn
  }
}

module.exports = {Connection}