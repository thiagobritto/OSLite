
const { ipcRenderer } = require('electron')

// event dom
window.addEventListener('DOMContentLoaded', () => {
    
    if ( ipcRenderer.sendSync('checkPermisions') < 1) {
        removeElement(document.getElementById('cad_user'))
        removeElement(document.getElementById('rel_user'))
    } 

    document.getElementById('logout').onclick = () => {
        if (window.confirm("Deseja sair do OSLite?")) ipcRenderer.send('logout');
    }
    
    document.getElementById('cad_user').onclick = () => ipcRenderer.send('openManageUsers');
    
})

// functions

function removeElement(enement){
    enement.parentNode.removeChild(enement);
}
