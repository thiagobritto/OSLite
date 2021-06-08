
const knex = require('../database')
const { screen } = require('electron')
const { checkPassword } = require('../library/emcryptDecript')

class LoginController {
    constructor(appData) {
        for (let key in appData) LoginController[key] = appData[key]
    }

    async login(event, args) {
        try {
            let stmt = await knex('users').where('userName', args.user)
            let verify = await checkPassword(args.pass, stmt[0].password)
            if (verify && stmt[0].status == 1) {
                const { width, height } = screen.getPrimaryDisplay().workAreaSize
                LoginController.dataUser = stmt[0]
                LoginController.createWindow()
                    .setWidth(width)
                    .setHeight(height)
                    .setTitle('OSLite - ' + stmt[0].userName)
                    .run('dashboard')
                LoginController.mainWindow.dashboard.maximize()
                LoginController.mainWindow.dashboard.webContents.openDevTools()
                LoginController.mainWindow.login.close()
                return true
            } 
            return false
        } catch (err) {
            return false;
        }
    }

    getDataUser(event, args){
        // synchronous-message
        event.returnValue = { 
            id: LoginController.dataUser.id,
            userName: LoginController.dataUser.userName, 
            super: LoginController.dataUser.super, 
            status: LoginController.dataUser.status 
        }
    }
}

module.exports = (appData = {}) => new LoginController(appData)
