// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { settingWindow } = require('./src/windows/_dists/settings/js/settingWindow')

let mainWindow = {}

function createWindow (settingWindow) {
  mainWindow[settingWindow.window] = new BrowserWindow({
    width: settingWindow.width,
    height: settingWindow.height,
    title: settingWindow.title,
    autoHideMenuBar: settingWindow.autoHideMenuBar,
    webPreferences: {
      preload: path.join(__dirname, `src/windows/${settingWindow.window}/preload.js`)
    }
  })

  mainWindow[settingWindow.window].loadFile(`src/windows/${settingWindow.window}/index.html`)
}

app.whenReady().then(() => {
  createWindow(settingWindow({
    width: 350,
    height: 200,
    title: 'OSLite login'
  }))
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow(loginWindow, 'login')
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.handle('login', (event, args) => {
  createWindow(settingWindow({
    window: 'dashboard'
  }))

  mainWindow.login.close()
})
