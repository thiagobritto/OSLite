
const knex = require('../database')
const { checkPassword } = require('../library/emcryptDecript')

class UserController{
    
    constructor(appData){
        for (let key in appData) UserController[key] = appData[key] 
    }

    async select(event, args){
        let users = await knex('users')
        return users
    }
}

module.exports = (appData = {}) => new UserController(appData)