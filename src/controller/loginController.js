
const knex = require('../database')
const { checkPassword } = require('../library/emcryptDecript')
let dataUser

async function loginController(namePass){
    try{
        let stmt = await knex('users').where('userName', namePass.user)
        let verify = await checkPassword(namePass.pass, stmt[0].password)
        return verify ? stmt[0] : false
    } catch(err){
        return false; 
    }
}

module.exports = { loginController }