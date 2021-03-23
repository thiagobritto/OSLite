const {
  app,
  BrowserWindow,
  ipcMain
} = require('electron')
const path = require('path')

let win;
function createWindow() {
  //tray = new Tray('/path/to/my/icon')
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'OSLite',
    titleBarStyle: 'hidden',
    autoHideMenuBar: true, /* remover em produção */
    webPreferences: {
      //devTools: false, /* ativar em produção */
      preload: path.join(__dirname, 'src/controller/indexController.js')
    }
  })
  win.loadURL(`file://${__dirname}/src/view/index.html`)
  //win.menuBarVisible = false /* ativar em produção */
  win.maximize()
  win.once("ready-to-show", () => { win.show() })
}

let winLogin;
function createWinLogin() {
  winLogin = new BrowserWindow({
    width: 500,
    height: 500,
    parent: win,
    resizable: false,
    maximizable: false,
    title: 'OSLite',
    titleBarStyle: 'hidden',
    autoHideMenuBar: true, /* remover em produção */
    center: true,
    webPreferences: {
      //devTools: false, /* ativar em produção */
      preload: path.join(__dirname, 'src/controller/loginController.js')
    }
  })
  winLogin.loadURL(`file://${__dirname}/src/view/login.html`)
  //winLogin.menuBarVisible = falsec/* ativar em produção */
  winLogin.once("ready-to-show", () => { winLogin.show() })
}

let winChild;
function createWinChild() {
  winChild = new BrowserWindow({
    width: 800,
    height: 600,
    parent: win,
    title: 'OSLite',
    titleBarStyle: 'hidden',
    autoHideMenuBar: true, /* remover em produção */
    webPreferences: {
      //devTools: false, /* ativa em produção */
      preload: path.join(__dirname, 'src/controller/mainController.js')
    }
  })
  winChild.loadURL(`file://${__dirname}/src/view/index.html`)
  //winChild.menuBarVisible = false /* ativar em produção */
  //winChild.maximize() /* ativar em produção */
  winChild.once("ready-to-show", () => { win.show() })
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
// ipcMain.handle('login', async (event, args) => {})

let userLogin;
ipcMain.handle('logar', (event, args) => {
  userLogin = args
  createWindow()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  winLogin.close()
})
