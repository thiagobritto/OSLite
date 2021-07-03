
const { ipcRenderer } = require('electron')

const { checkPassword } = require('../library/emcryptHash');
const users = require('../models/DAO/usersDAO')('users')
const empty = require('../library/empty')()
const str = require('../library/strings')()

require('dotenv').config()

class LoginController 
{
    sigin(autParams){
        return new Promise( async (resove, reject) => {
            if (empty.isEmptyValuesObj(autParams)) reject('Preencha todos os campos!');
            let user = await users.select({userName: autParams.user});
            let checkPass = user[0] ? await checkPassword(autParams.pass, user[0].password) : false;
            if (!checkPass || user[0].status < 1) {
                reject('Usuário ou senha invalidos!');
            } else {
                ipcRenderer.on('createWindow-reply', (event, arg) => {
                    ipcRenderer.send('maximizeWindow', 'dash')
                    ipcRenderer.send('closeWindow', 'login')
                })
                ipcRenderer.send('createWindow', {
                    winName: 'dash',
                    dataUser: user[0],
                    props: {
                        title: process.env.APPLICATION_NAME +' - '+ str.strFirstUpper(user[0].userName),
                        ...ipcRenderer.sendSync('fullScreen')
                    } 
                })
            }
        })
    }

    applicationName(){
        return process.env.APPLICATION_NAME;
    }
}

module.exports = () => new LoginController();
