
const login = require('../../../src/controllers/loginController')()

require('../../dists/materialize/js/materialize');

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('entrar').onclick = (e) => {
    e.preventDefault();
    login.sigin({
      user: document.getElementById('name').value,
      pass: document.getElementById('pass').value
    }).catch(err => {
      msgError(err);
    })
  }
});

function msgError(msg){
  M.toast({html: msg});
}

/*
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
*/