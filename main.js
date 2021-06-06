// Modules to control application life and create native browser window
const { app, ipcMain, screen } = require('electron')
const { mainWindow, createWindow } = require('./src/library/createWindow')

app.whenReady().then(() => {
  crateLogin()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) crateLogin()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

function crateLogin(){
  createWindow()
    .setWidth(350)
    .setHeight(250)
    .setTitle('Login')
    .setMaximizable(false)
    .setResizable(false)
    .setCenter(true)
    .setdDevTools(false)
    .run()
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const { loginController } = require('./src/controller/loginController')

var dataUser

ipcMain.handle('login', async (event, args) => {
  dataUser = await loginController(args)
  if (dataUser){
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    createWindow()
      .setWidth(width)
      .setHeight(height)
      .setTitle('OSLite - ' + dataUser.userName)
      .run('dashboard')
    
    mainWindow.dashboard.maximize()      
    mainWindow.dashboard.webContents.openDevTools()      
    mainWindow.login.close()      
  } else return false
})


ipcMain.on('logout', (event, args) => {
  crateLogin()
  mainWindow.dashboard.close()
})

ipcMain.on('dataUser', (event, arg) => {
  // synchronous-message
  event.returnValue = { 
    id: dataUser.id,
    userName: dataUser.userName, 
    super: dataUser.super, 
    status: dataUser.status 
  }
})

