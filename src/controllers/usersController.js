
const { passwordHash } = require('../library/emcryptDecript');
const usersDAO = require('../database/DAO/usersDAO')('users');

class UsersController {

    constructor(mainWindow, createWindow) {
        UsersController.mainWindow = mainWindow;
        UsersController.createWindow = createWindow;
    }

    getDataUsers(event, args) {
        return usersDAO.selectUsers();
    }

    async insertNewUser(event, args){
        try{
            if (args.password) args.password = await passwordHash(args.password);
            let results = await usersDAO.insert(args);
            return {
                id: results,
                status: true
            }
        } catch (err){
            return {
                error: 'Erro ao tentar inserir o usuário!',
                errorMessage: err.message,
                status: false
            }
        }
    }
    async updateUser(event, args) {
        try {
            if (args.data.password) args.data.password = await passwordHash(args.data.password);
            let results = await usersDAO.update({id:args.id}, args.data);
            return {
                rows: results,
                status: true
            }
        } catch (err) {
            return {
                error: 'Erro ao tentar atualizar cadastro!',
                errorMessage: err.message,
                status: false
            }
        }
    }
    
}

module.exports = (mainWindow, createWindow) => new UsersController(mainWindow, createWindow);