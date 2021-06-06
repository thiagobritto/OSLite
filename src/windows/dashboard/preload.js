
const { ipcRenderer } = require('electron')

// event dom
window.addEventListener('DOMContentLoaded', () => {

    document.getElementById('os').onclick = () => {
        console.log('dd');
        console.log(ipcRenderer.sendSync('dataUser')) 
    }

})