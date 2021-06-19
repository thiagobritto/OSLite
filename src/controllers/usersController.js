
const { passwordHash } = require('../library/emcryptDecript');
const usersDAO = require('../database/DAO/usersDAO')('users');

class UsersController {

    constructor(mainWindow, createWindow) {
        UsersController.mainWindow = mainWindow;
        UsersController.createWindow = createWindow;
    }

    async getDataUsers(event, args) {
        return await usersDAO.selectUsers();
    }
    /*
    async insert(event, args) {
        args.password = await passwordHash(args.password)
        return await user.insert(args)
    }
    async updateSuper(event, args) {
        return await user.update({id: args.id}, {super: args.value})
    }
    async updateStatus(event, args) {
        return await user.update({id: args.id}, {status: args.value})
    }
    async updateUser(event, args){
        if (args.data.password) args.data.password = await passwordHash(args.data.password)
        return await user.update({id: args.id}, args.data)
    }
    */
}

module.exports = (mainWindow, createWindow) => new UsersController(mainWindow, createWindow);