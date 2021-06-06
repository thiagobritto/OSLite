
const knex = require('../database')
const { checkPassword } = require('../library/emcryptDecript')

async function loginController(namePass){
    try{
        let stmt = await knex('users').where('userName', namePass.user)
        let verify = await checkPassword(namePass.pass, stmt[0].password)
        if (verify && stmt[0].status == 1) return stmt[0]
        return false
    } catch(err){
        return false; 
    }
}

module.exports = { loginController }