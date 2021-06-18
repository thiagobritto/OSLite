
const { ipcMain } = require('electron')

const { mainWindow, createWindow } = require( './src/library/createWindow' )
require('./appStart')( createWindow )

const login = require('./src/controllers/loginController')();
const dash = require('./src/controllers/dashController')(mainWindow, createWindow);

ipcMain.handle('login', login.login);

ipcMain.on('openDashboard', dash.openDashboard);
ipcMain.on('checkPermisions', dash.checkPermisions);
ipcMain.on('logout', dash.logout);
ipcMain.on('openManageUsers', dash.openManageUsers)

/*

const dash = require('./src/controller/dashboardController')({
  createWindow,
  mainWindow
})

const user = require('./src/controller/userController')({
  createWindow,
  mainWindow
})



ipcMain.handle('getDataUsers', user.select)
ipcMain.handle('setSuper', user.updateSuper)
ipcMain.handle('setStatus', user.updateStatus)
ipcMain.handle('updateUser', user.updateUser)
ipcMain.handle('insertUser', user.insert)
//updateUser
*/