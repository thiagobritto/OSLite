
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

    statusUpdate(id, status) {
        return this.update({ id }, { status })
    }

    superUpdate(id, superUp) {
        return this.update({ id }, { super: superUp })
    }

    dataUpdate(id, status, superUser, passwold = false) {
        if (passwold) {
            return this.update({ id }, {
                status: status ? 1 : 0,
                super: superUser ? 1 : 0,
                updated_at: new Date(),
                passwold
            })
        } else {
            return this.update({ id }, {
                status: status ? 1 : 0,
                super: superUser ? 1 : 0,
                updated_at: new Date()
            })
        }
    }
}

module.exports = (tableNane) => new UsersDAO(tableNane)
