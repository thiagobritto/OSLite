
//const { mainWindow, createWindow } = require('../library/createWindow')

class DashController {

    constructor(appData){
        for (let key in appData) DashController[key] = appData[key]
    }

    logout(event, arg) {
        DashController.createWindow()
            .setWidth(350)
            .setHeight(250)
            .setTitle('Login')
            .setMaximizable(false)
            .setResizable(false)
            .setCenter(true)
            .setdDevTools(false)
            .run()
            DashController.mainWindow.dashboard.close()
    }

    manageUser(event, arg){
        DashController.createWindow()
            .setParent(DashController.mainWindow.dashboard)
            .setModal(true)
            .setShow(false)
            .run('manageUser')
    }

}

module.exports = (appData = {}) => new DashController(appData)
