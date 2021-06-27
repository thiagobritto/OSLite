
/**
 * Cria um gerenciador do usuario
 * @class
 */
class User {

    /**
     * Recebe o method de comunicaçao com o main 'ipcRenderer'
     * @constructor
     * @param {object} ipcRenderer 
     * @param {(event, args)} ipcRenderer.sendSync
     */
    constructor(ipcRenderer){
        this._dataUser = ipcRenderer.sendSync('getDataUser');
    }

    /**
     * Retorna o nome do usuario
     * @returns {string} User.name
     */
    get name(){
        return this._dataUser.userName;
    }
}

module.exports = (ipcRenderer) => new User(ipcRenderer)
