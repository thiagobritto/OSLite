require('../_dists/materialize/js/materialize')

const { ipcRenderer } = require('electron')
const knex = require('../../database')
const bcrypt = require('bcrypt')

document.addEventListener('DOMContentLoaded', () => {
  let entrar = document.getElementById('entrar')
  entrar.onclick = (e) => {
    e.preventDefault()

    knex('users').then( results => {
      let user
      results.map( table => {
        if (table.userName == login.name.value) user = table
      })
      return user
    }).then( async table => {
      if (table) {
        if (await checkPassword(login.pass.value, table.password)){
          ipcRenderer.invoke('login', table)
        } else errorLogin()
      } else errorLogin()
    })
  }
})

async function checkPassword(pass, hash){
  const match = await bcrypt.compare(pass, hash)
  if (match) {
    return true;
  } else {
    return false
  }
}

function errorLogin(){
  M.toast({html: 'Usuário ou senha invalidos!'})
}

//examinando o hash de 2^10 até 2^20
//  bcrypt.hash(pass, 12)
//    .then((passHashed)=> {
//          console.log(passHashed);
//    });