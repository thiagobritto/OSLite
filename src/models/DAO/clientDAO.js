
const CRUD = require('./CRUD')

class ClientDAO extends CRUD {
    constructor(tableNane) {
        super(tableNane)
    }

    async insertClientModel(clientModel){
        return this.insert(clientModel)
    }
}

module.exports = (tableNane) => new ClientDAO(tableNane)
