
const CRUD = require('./CRUD')

class CarroDAO extends CRUD {
    constructor(tableNane) {
        super(tableNane)
    }
}

module.exports = (tableNane) => new CarroDAO(tableNane)
