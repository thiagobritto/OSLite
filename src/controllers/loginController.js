
const { ipcRenderer } = require('electron')
const { checkPassword } = require('../library/emcryptHash');
const users = require('../models/DAO/usersDAO')('users')
const empty = require('../models/empty')()

class LoginController 
{
    sigin(autParams){
        return new Promise( async (resove, reject) => {
            if (empty.isEmptyValuesObj(autParams)) reject('Preencha todos os campos!');
            let user = await users.selectUser({userName: autParams.user});
            let checkPass = user[0] ? await checkPassword(autParams.pass, user[0].password) : false;
            if (!checkPass || user[0].status < 1) {
                reject('Usuário ou senha invalidos!');
            } else {
                ipcRenderer.on('createWindow-reply', (event, arg) => {
                    ipcRenderer.sendSync('closeWindow', 'login')
                })
                ipcRenderer.send('createWindow', {
                    winName: 'dash',
                    dataUser: user[0],
                    props: ipcRenderer.sendSync('fullScreen')
                })
            }
        })
    }
}

module.exports = () => new LoginController();
