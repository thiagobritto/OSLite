
const knex = require('../database')
const { passwordHash } = require('../library/emcryptDecript')

class UserController {

    constructor(appData) {
        for (let key in appData) UserController[key] = appData[key]
    }

    async insert(event, args) {
        let res = await knex('users')
            .returning('id')
            .insert([
                { 
                    username: args.name, 
                    password: passwordHash(args.pass), 
                    super: args.admin,
                    status: args.status 
                }
            ])
        return res ? res : false;
    }

    async select(event, args) {
        let users = await knex('users')
        return users
    }

    async update(event, args) {
        let res = await knex('users')
            .where('id', '=', args.userId)
            .update(args.data)
            .decrement({
                balance: 50,
            }).clearCounters()
        return res ? res : false
    }
}

module.exports = (appData = {}) => new UserController(appData)