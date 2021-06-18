
const { screen } = require('electron');

class DashController {

    constructor(mainWindow, createWindow) {
        DashController.mainWindow = mainWindow;
        DashController.createWindow = createWindow;
    }

    openDashboard(event, args) {
        const { width, height } = screen.getPrimaryDisplay().workAreaSize;
        DashController.dataUser = args;
        DashController.createWindow()
            .setTitle(`OSLite - ${DashController.dataUser.userName}`)
            .setWidth(width)
            .setHeight(height)
            .run('dash');
        DashController.mainWindow.dash.maximize();
        DashController.mainWindow.login.close();
    }

    checkPermisions(event, args) {
        event.returnValue = DashController.dataUser.super;
    }

    logout(event, args) {
        DashController.createWindow()
            .setTitle(`Login`)
            .setWidth(350)
            .setHeight(280)
            .setMaximizable(false)
            .setResizable(false)
            .setCenter(true)
            .setDevTools(false)
            .run();
        DashController.mainWindow.dash.close();
    }

    openManageUsers(event, args) {
        DashController.createWindow()
            .setParent(DashController.mainWindow.dash)
            .setModal(true)
            .setShow(false)
            .run('users');
    }

}

module.exports = (mainWindow, createWindow) => new DashController(mainWindow, createWindow)
