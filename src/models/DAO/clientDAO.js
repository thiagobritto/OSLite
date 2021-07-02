
const CRUD = require('./CRUD')

class ClientDAO extends CRUD {
    constructor(tableNane) {
        super(tableNane)
    }

    async insertClient(name){
        return this.insert({
            name
        })
    }
}

module.exports = (tableNane) => new ClientDAO(tableNane)
