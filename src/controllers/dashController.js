
const { ipcRenderer } = require('electron')
const elementsDOM = require('../models/elementsDOM')()

require('dotenv').config()

class DashController {

    authentication(btnAdmin, callback) {
        if (ipcRenderer.sendSync('getDataUser').super < 1) {
            elementsDOM.clearElements(btnAdmin);
        } else {
            callback(btnAdmin)
        }
    }

    logout() {
        ipcRenderer.send('startApp')
        ipcRenderer.send('closeWindow', 'dash')
    }

    setNameUserIn(elementsName) {
        elementsDOM.setInElements(
            elementsName,
            ipcRenderer.sendSync('getDataUser').userName
        )
    }

    setNameAppIn(elementsName) {
        elementsDOM.setInElements(elementsName, process.env.APPLICATION_NAME)
    }

    openWindowParent(name, parent) {
        ipcRenderer.send('createWindowParent', {
            winName: name,
            parentName: parent,
            props: {
                modal: true
            }
        })
    }

    openUserPanel() {
        this.openWindowParent('users', 'dash')
    }

    openClientPanel(){
        this.openWindowParent('client', 'dash')
    }
}

module.exports = () => new DashController()
