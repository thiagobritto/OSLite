
const knex = require('../database')
const { screen } = require('electron')
const { checkPassword } = require('../library/emcryptDecript')

class LoginController {
    constructor(appData) {
        LoginController.app = appData
    }

    async login(event, args) {
        try {
            let stmt = await knex('users').where('userName', args.user)
            let verify = await checkPassword(args.pass, stmt[0].password)
            if (verify && stmt[0].status == 1) {
                const { width, height } = screen.getPrimaryDisplay().workAreaSize
                LoginController.dataUser = stmt[0]
                LoginController.app.createWindow()
                    .setWidth(width)
                    .setHeight(height)
                    .setTitle('OSLite - ' + stmt[0].userName)
                    .run('dashboard')
                LoginController.app.mainWindow.dashboard.maximize()
                LoginController.app.mainWindow.dashboard.webContents.openDevTools()
                LoginController.app.mainWindow.login.close()
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

module.exports = (obj = {}) => new LoginController(obj)
