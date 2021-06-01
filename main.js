// Modules to control application life and create native browser window
const { app, BrowserView, ipcMain } = require('electron')
const { mainWindow, createWindow } = require('./src/library/createWindow')

app.whenReady().then(() => {
  createWindow()
    .setWidth(350)
    .setHeight(250)
    .setTitle('OSLite - Login')
    .run()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0)
      createWindow().setWidth(350)
        .setHeight(250)
        .setTitle('OSLite - Login')
        .run()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.handle('login', (event, args) => {
  createWindow().run('dashboard', (win) => {
    const view = new BrowserView()
    win.setBrowserView(view)
    view.setBounds({ x: 0, y: 0, width: 360, height: 360 })
    view.webContents.loadURL('https://www.electronjs.org')
  })
  mainWindow.login.close()
})
