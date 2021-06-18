
const { ipcRenderer } = require('electron');
require('../../dists/materialize/js/materialize');

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('entrar').onclick = (e) => {
    e.preventDefault();
    try{
      let userLogin = {
        user: login.name.value ? login.name.value : nameNull(),
        pass: login.pass.value ? login.pass.value : passNull()
      }
      // Envie uma mensagem para o processo principal via channele espere um resultado de forma assíncrona.
      ipcRenderer.invoke('login', userLogin ).then( res => {
        if (res === false) {
          valueError('Usuário ou senha invalidos!')
        } else {
          ipcRenderer.send('openDashboard', res)
        }
      });
    }catch(err){
      valueError(err);
    }
  }
});

// functions

function nameNull(){
  throw 'Usuário não preenchido!';
}

function passNull(){
  throw 'Senha não preenchida!';
}

function valueError(msg){
  M.toast({html: msg});
}
