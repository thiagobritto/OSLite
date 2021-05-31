require('../_dists/materialize/js/materialize')

const { ipcRenderer } = require('electron')
const knex = require('../../database')
const bcrypt = require('bcrypt')

document.addEventListener('DOMContentLoaded', () => {
  login.entrar.onclick = (e) => {
    e.preventDefault()

    knex('users').then( results => {
      results.map( table => {
        if (table.userName == login.name.value){
          checkPassword(login.pass.value, table.password).then( checkin => {
            if ( checkin ){
              ipcRenderer.invoke('login', table)
            } else errorLogin()
          })
        } else errorLogin()
      })
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