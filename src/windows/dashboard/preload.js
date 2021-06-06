
const { ipcRenderer } = require('electron')

// event dom
window.addEventListener('DOMContentLoaded', () => {

    // Envie uma mensagem para o processo principal via channele espere um resultado de forma síncrona.
    let dataUser = ipcRenderer.sendSync('dataUser')
    
    if ( dataUser.super < 1) {
        removeElement(document.getElementById('cad_user'))
        removeElement(document.getElementById('rel_user'))
    } 
    
    document.getElementById('logout').onclick = () => {
        // Envie uma mensagem assíncrona para o processo principal através do channel, juntamente com argumentos
        if (window.confirm("Deseja sair do OSLite?")) ipcRenderer.send('logout')
    }

})

// functions

function removeElement(enement){
    enement.parentNode.removeChild(enement)
}