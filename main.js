
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

const user = require('./src/controller/userController')({
  createWindow,
  mainWindow
})

ipcMain.handle('login', login.login)
ipcMain.on('getUser', login.getDataUser)

ipcMain.on('logout', dash.logout)
ipcMain.on('manageUser', dash.manageUser)

ipcMain.handle('getDataUsers', user.select)
ipcMain.handle('setSuper', user.update)
ipcMain.handle('setStatus', user.update)
ipcMain.handle('insertUser', user.insert)
