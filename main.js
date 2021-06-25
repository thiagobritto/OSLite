
const { ipcMain  } = require('electron')
const { startApp } = require('./src/library/createWindow')

startApp();

// CODE ...

const main = require('./src/library/mainController')()

ipcMain.on('createWindow', main.createWin)
ipcMain.on('createWindowParent', main.createWindowParent)
ipcMain.on('closeWindow', main.closeWindow)
ipcMain.on('getDataUser', main.getDataUser)
ipcMain.on('fullScreen', main.fullScreen)
