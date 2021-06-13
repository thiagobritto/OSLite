
const user = require('../database/CRUD')('users')
const { passwordHash } = require('../library/emcryptDecript')

// select * from table  limit 0, 5;

class UserController {

    constructor(appData) {
        for (let key in appData) UserController[key] = appData[key]
    }
    async insert(event, args) {
        return await user.insert(args)
    }
    async select(event, args) {
        return await user.list()
    }
    async updateSuper(event, args) {
        return await user.update({id: args.id}, {super: args.value})
    }
    async updateStatus(event, args) {
        return await user.update({id: args.id}, {status: args.value})
    }
}

module.exports = (appData = {}) => new UserController(appData)