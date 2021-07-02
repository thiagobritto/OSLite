
const CRUD = require('./CRUD')

class ClientDAO extends CRUD {
    constructor(tableNane) {
        super(tableNane)
    }
}

module.exports = (tableNane) => new ClientDAO(tableNane)
