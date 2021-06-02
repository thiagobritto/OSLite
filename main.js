// Modules to control application life and create native browser window
const { app, ipcMain, screen } = require('electron')
const { mainWindow, createWindow } = require('./src/library/createWindow')

app.whenReady().then(() => {
  createWindow()
    .setWidth(350)
    .setHeight(250)
    .setTitle('OSLite - Login')
    .setMaximizable(false)
    .setResizable(false)
    .setCenter(true)
    .setdDevTools(false)
    .run()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0)
      createWindow()
        .setWidth(350)
        .setHeight(250)
        .setTitle('OSLite - Login')
        .setMaximizable(false)
        .setResizable(false)
        .setCenter(true)
        .setdDevTools(false)
        .run()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.handle('login', (event, args) => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  createWindow()
    .setWidth(width)
    .setTitle(height)
    .run('dashboard')
  mainWindow.dashboard.maximize()
  mainWindow.dashboard.webContents.openDevTools()
  mainWindow.login.close()
})
