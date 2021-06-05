const bcrypt = require('bcrypt')
const knex = require('../database')

async function loginController(namePass){
    try{
        let stmt = await knex('users').where('userName', namePass.user)
        let verify = await checkPassword(namePass.pass, stmt[0].password)
        return verify ? stmt[0] : false
    } catch(err){
        return false; 
    }
}

async function checkPassword(pass, hash){
    const match = await bcrypt.compare(pass, hash)
    if (match) {
        return true;
    } else {
        return false
    }
}

//examinando o hash de 2^10 até 2^20
//  bcrypt.hash(pass, 12)
//    .then((passHashed)=> {
//          console.log(passHashed);
//    });

module.exports = { loginController }