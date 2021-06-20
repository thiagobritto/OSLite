
const { ipcMain } = require('electron');

const { mainWindow, createWindow } = require( './src/library/createWindow' );
require('./appStart')( createWindow );

const login = require('./src/controllers/loginController')();
const dash = require('./src/controllers/dashController')(mainWindow, createWindow);
const users = require('./src/controllers/usersController')(mainWindow, createWindow);


ipcMain.handle('login', login.login);

ipcMain.on('openDashboard', dash.openDashboard);
ipcMain.on('checkPermisions', dash.checkPermisions);
ipcMain.on('openManageUsers', dash.openManageUsers);
ipcMain.on('logout', dash.logout);

ipcMain.handle('getDataUsers', users.getDataUsers);
ipcMain.handle('insertNewUser', users.insertNewUser);


/*



ipcMain.handle('setSuper', user.updateSuper)
ipcMain.handle('setStatus', user.updateStatus)
ipcMain.handle('updateUser', user.updateUser)
//updateUser
*/