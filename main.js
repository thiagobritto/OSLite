const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

// connection db
const { Connection } = require('./src/DAO/Connection.js')
const conn = new Connection

// elemens electron js
let win, winLogin, userLogin;

function createWindow () {
  //tray = new Tray('/path/to/my/icon')
    win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    //transparent: true,
    //frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'src/controller/mainController.js')
    }
  })
  win.loadURL(`file://${__dirname}/src/view/index.html`)
  win.once("ready-to-show", () => { win.show() })
}

function createWinLogin () {
  winLogin = new BrowserWindow({
    width: 500,
    height: 500,
    resizable: false,
    maximizable: false,
    titleBarStyle: 'hidden',
    center: true,
    webPreferences: {
      preload: path.join(__dirname, 'src/controller/loginController.js')
    }
  })
  winLogin.loadURL(`file://${__dirname}/src/view/login.html`)
  winLogin.once("ready-to-show", () => { winLogin.show() })
}

app.whenReady().then(() => {
  createWinLogin()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.handle('login', async (event, args) => {
  const result = await selectUser(args)
  return result
})

function selectUser( obj ) {
  let user = conn.select("id","name","status").table('user').where({"name": obj.name, "pass": obj.pass});
  return user
}

ipcMain.handle('logar',  (event, args) => {
  userLogin = args
  createWindow()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  winLogin.close()
})
