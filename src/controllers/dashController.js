
const { ipcRenderer } = require('electron')
const elementsDOM = require('../models/elementsDOM')()

class DashController {
    authentication(btnAdmin){
        if (ipcRenderer.sendSync('getDataUser').super < 1) 
            elementsDOM.clearElements(btnAdmin); 
    }
    logout(){
        ipcRenderer.send('startApp')
        ipcRenderer.send('closeWindow', 'dash')
    }
}

module.exports = () => new DashController()
