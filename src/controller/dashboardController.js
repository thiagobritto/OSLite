
//const { mainWindow, createWindow } = require('../library/createWindow')

class DashController {

    constructor(appData){
        DashController.app = appData
    }

    logout(event, arg) {
        DashController.app.createWindow()
            .setWidth(350)
            .setHeight(250)
            .setTitle('Login')
            .setMaximizable(false)
            .setResizable(false)
            .setCenter(true)
            .setdDevTools(false)
            .run()
            DashController.app.mainWindow.dashboard.close()
    }

    manageUser(event, arg){
        DashController.app.createWindow()
            .setParent(DashController.app.mainWindow.dashboard)
            .setModal(true)
            .setShow(false)
            .run('manageUser')
    }

}

module.exports = (appData) => new DashController(appData)
