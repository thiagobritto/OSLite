
const { ipcMain } = require('electron')

const { mainWindow, createWindow } = require('./src/library/createWindow')
require('./appStart')(createWindow)

const login = require('./src/controller/loginController')({
  createWindow,
  mainWindow
})

const dash = require('./src/controller/dashboardController')({
  createWindow,
  mainWindow
})

ipcMain.handle('login', login.login)
ipcMain.on('getUser', login.getDataUser)

ipcMain.on('logout', dash.logout)
ipcMain.on('manageUser', dash.manageUser)

//ipcMain.on('test', (event, args) => {
  //console.log(login.dataUser);
//})
