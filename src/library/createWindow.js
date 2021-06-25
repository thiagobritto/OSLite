
const { app, BrowserWindow } = require('electron');
const path = require('path')

var win = {};

function createWindow(winName, winProps = {}){
    win[winName] = new BrowserWindow({
        width: winProps.width ? winProps.width : 800,
        height: winProps.height ? winProps.height : 600,
        title: winProps.title ? winProps.title : 'OSLite',
        parent: winProps.parent ? winProps.parent : null,
        modal: winProps.modal ? winProps.modal : false,
        maximizable: winProps.maximizable === false ? winProps.maximizable : true,
        resizable: winProps.resizable === false ? winProps.resizable : true,
        center: winProps.center === false ? winProps.center : true,
        icon: "icon.png",
        autoHideMenuBar: true,
        webPreferences: {
            devTools: winProps.devTools === false ? winProps.devTools : true,
            preload: path.join(__dirname,`../../public/windows/${winName}/preload.js`)
        }
    })
    win[winName].loadFile(path.join(__dirname,`../../public/windows/${winName}/index.html`))
    win[winName].webContents.openDevTools()
}

function startApp(){
    app.whenReady().then(() => {
        createWindow('login', { width: 380, height: 300, maximizable: false, resizable: false })
        app.on('activate', function () {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow('login', { width: 380, height: 300, maximizable: false, resizable: false })
            }
        })
    })
    
    app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') app.quit()
    })
}

module.exports = { win, createWindow, startApp };