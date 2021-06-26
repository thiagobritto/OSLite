
const dash = require('../../../src/controllers/dashController')()

// event dom
window.addEventListener('DOMContentLoaded', () => {
    dash.authentication([
        document.getElementById('cad_user'),
        document.getElementById('rel_user')
    ])
    document.getElementById('logout').onclick = dash.logout
})

/*
    

    
    document.getElementById('cad_user').onclick = () => ipcRenderer.send('openManageUsers');
    
    function test(){
        console.log('test');
    }
    */