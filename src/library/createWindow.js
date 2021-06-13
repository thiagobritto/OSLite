const { BrowserWindow } = require('electron')
const path = require('path')
const dirname = path.join(__dirname, '../../')

var mainWindow = {}

class MainWindow {
    constructor() {
        this.width = 800
        this.height = 600
        this.title = 'OSLite'
        this.icon = dirname + "icon_dark.png"
        this.autoHideMenuBar = true
        this.webPreferences = {}
    }
    setWidth(width) {
        this.width = width
        return this
    }
    setHeight(height) {
        this.height = height
        return this
    }
    setTitle(title) {
        this.title = title
        return this
    }
    setParent(parent){
        this.parent = parent
        return this
    }
    setModal(modal){
        this.modal = modal
        return this
    }
    setShow(show){
        this.show = show
        return this
    }
    setResizable(resizable){
        this.resizable = resizable
        return this
    }
    setMaximizable(maximizable){
        this.maximizable = maximizable
        return this
    }
    setCenter(center){
        this.center = center
        return this
    }
    // webPreferences
    setDevTools(devTools){
        this.webPreferences.devTools = devTools
        return this
    }
    setPreload(preload){
        this.webPreferences.preload = path.join(dirname, `src/windows/${preload}/preload.js`)
        return this
    }
    // main
    run(pageName, setCall) 
    {
        let pageWindow = pageName ? pageName : 'login'

        this.setPreload(pageWindow)
        
        mainWindow[pageWindow] = new BrowserWindow(this)
        
        if (setCall) setCall(mainWindow[pageWindow], this)
        
        mainWindow[pageWindow].loadURL(`file://${dirname}/src/windows/${pageWindow}/index.html`)
        mainWindow[pageWindow].once("ready-to-show", () => { mainWindow[pageWindow].show() })
        //console.log(this);
    }
}

function createWindow() {
    return new MainWindow()
}

module.exports = { mainWindow, createWindow }

/*
    function isEmpty(obj)
    {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) return false
        }
        return JSON.stringify(obj) === JSON.stringify({});
    }
*/