
const { checkPassword } = require('../library/emcryptDecript');
const usersDAO = require('../database/DAO/usersDAO')('users');

class LoginController 
{
    async login(event, args) {
        let res = await usersDAO.selectUser({ userName: args.user });
        if (!res[0] || !await checkPassword(args.pass, res[0].password)) return false;
        return res[0];
    }
}

module.exports = () => new LoginController();
