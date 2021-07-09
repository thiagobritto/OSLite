
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

    async getClient(id) {
        let client = await this.select({ id })
        return client[0]
    }

    updateClientModel(id, clientModel) {
        return this.update({ id }, clientModel)
    }

    deleteClient(id){
        return this.delete({id})
    }
}

module.exports = (tableNane) => new ClientDAO(tableNane)
