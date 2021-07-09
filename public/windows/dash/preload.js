
const dash = require('../../../src/controllers/dashController')()

// event dom
window.addEventListener('DOMContentLoaded', () => {
    dash.authentication([
        document.getElementById('cad_user'),
        document.getElementById('rel_user')
    ], user => {
        user[0].onclick = e => dash.openUserPanel(e)
    })

    dash.setNameUserIn(document.getElementsByClassName('user'))
    dash.setNameAppIn(document.getElementsByClassName('appName'))

    document.getElementById('cad_client').onclick = e => dash.openClientPanel(e)
    document.getElementById('cad_carro').onclick = e => dash.openCarroPanel(e)
    document.getElementById('logout').onclick = e => dash.logout(e)
})

/*
    

    
    document.getElementById('cad_user').onclick = () => ipcRenderer.send('openManageUsers');
    
    function test(){
        console.log('test');
    }
    */