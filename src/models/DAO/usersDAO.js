
const { CRUD } = require('./CRUD');

class UsersDAO extends CRUD {
    constructor(tableNane) {
        super(tableNane)
    }

    getUsers() {
        return this.selectAll()
    }

    async getUser(id) {
        let user = await this.select({ id })
        return user[0]
    }

    statusUpdate(id, status){
        return this.update( { id }, { status } )
    }

    superUpdate(id, superUp){
        return this.update( { id }, { super: superUp } )
    }
}

module.exports = (tableNane) => new UsersDAO(tableNane)
