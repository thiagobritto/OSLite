
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

    openUserPanel() {
        ipcRenderer.send('createWindowParent', {
            winName: 'users',
            parentName: 'dash',
            props: {
                modal: true
            }
        })
    }
}

module.exports = () => new DashController()
