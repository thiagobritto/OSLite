
const { screen } = require('electron');
const { win, createWindow } = require('./createWindow');

class MainController {

    constructor() {
        MainController.dataUser = {};
    }

    createWin(event, args){
        MainController.dataUser = args.dataUser ? args.dataUser : {};
        createWindow(args.winName, args.props ? args.props : {});
        event.reply('createWindow-reply');
    }

    getDataUser(event, args){
        event.returnValue = MainController.dataUser;
    }

    createWindowParent(event, args){
        createWindow(args.winName, { parent: win[args.parentName], ...args.props });
    }

    closeWindow(event, winName){
        win[winName].close();
    }

    fullScreen(event, args){
        let {width, height} = screen.getPrimaryDisplay().workAreaSize;
        event.returnValue = {width, height}; 
    }

    maximizeWindow(event, winName){
        win[winName].maximize();
    }

}

module.exports = () => new MainController()
