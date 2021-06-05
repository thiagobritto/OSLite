
const { ipcRenderer } = require('electron')
require('../_dists/materialize/js/materialize')

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('entrar').onclick = (e) => {
    e.preventDefault()
    try{
      let userLogin = {
        user: login.name.value ? login.name.value : nameNull(),
        pass: login.pass.value ? login.pass.value : passNull()
      }
      ipcRenderer.invoke('login', userLogin ).then((result) => {
        if (result == false) valueError('Usuário ou senha invalidos!')
      })
    }catch(err){
      valueError(err)
    }
  }
})

// functions

function nameNull(){
  throw 'Usuário não preenchido!'
}

function passNull(){
  throw 'Senha não preenchida!'
}

function valueError(msg){
  M.toast({html: msg})
}