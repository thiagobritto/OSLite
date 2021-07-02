
const { passwordHash } = require('../../library/emcryptHash')
const data = require('../dateFormat')()

const CRUD = require('./CRUD')

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

    async insertUser(userName, password, status, superUser){
        return this.insert({
            userName, 
            password: await passwordHash(password), 
            status: status ? 1 : 0, 
            super: superUser ? 1 : 0
        })
    }

    async dataUpdate(id, status, superUser, password = false) {
        if (password) {
            return this.update({ id }, {
                status: status ? 1 : 0,
                super: superUser ? 1 : 0,
                updated_at: data.formatDB(new Date()),
                password: await passwordHash(password)
            })
        } else {
            return this.update({ id }, {
                status: status ? 1 : 0,
                super: superUser ? 1 : 0,
                updated_at: data.formatDB(new Date())
            })
        }
    }
}

module.exports = (tableNane) => new UsersDAO(tableNane)
