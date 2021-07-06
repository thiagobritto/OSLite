
const CRUD = require('./CRUD')

class ClientDAO extends CRUD {
    constructor(tableNane) {
        super(tableNane)
    }

    insertClientModel(clientModel){
        return this.insert(clientModel)
    }

    searchClient(name){
        return this.like('name', name)
    }
}

module.exports = (tableNane) => new ClientDAO(tableNane)
