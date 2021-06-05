// Modules to control application life and create native browser window
const { app, ipcMain, screen } = require('electron')
const { mainWindow, createWindow } = require('./src/library/createWindow')

app.whenReady().then(() => {
  createWindow()
    .setWidth(350)
    .setHeight(250)
    .setTitle('Login')
    .setMaximizable(false)
    .setResizable(false)
    .setCenter(true)
    .setdDevTools(true)
    .run()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0)
      createWindow()
        .setWidth(350)
        .setHeight(250)
        .setTitle('Login')
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

const { loginController } = require('./src/controller/loginController')

ipcMain.handle('login', async (event, args) => {
  let res = await loginController(args)
  if (res){
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    createWindow()
        .setWidth(width)
        .setHeight(height)
        .setTitle('OSLite')
        .run('dashboard')

    mainWindow.dashboard.maximize()      
    mainWindow.dashboard.webContents.openDevTools()      
    mainWindow.login.close()      
  } else return false
})
