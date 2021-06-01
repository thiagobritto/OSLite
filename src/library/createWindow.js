const { BrowserWindow } = require('electron')
const path = require('path')
const dirname = path.join(__dirname, '../../')

var mainWindow = {}

class MainWindow {
    constructor() {
        this.width = 800
        this.height = 600
        this.title = 'OSLite'
        this.autoHideMenuBar = true
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
    setWebPreferences(obj) {
        this.webPreferences = obj
    }
    run(page) {
        let pageWindow = page ? page : 'login'

        this.setWebPreferences({
            preload: path.join(dirname, `src/windows/${pageWindow}/preload.js`)
        })

        mainWindow[pageWindow] = new BrowserWindow(this)
        mainWindow[pageWindow].loadFile(path.join(dirname, `src/windows/${pageWindow}/index.html`))
        //console.log(this);
        return this
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