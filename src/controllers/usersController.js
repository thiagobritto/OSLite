
const ejs = require('ejs')
const path = require('path')

const usersDAO = require('../models/DAO/usersDAO')('users')
const elementsDOM = require('../models/elementsDOM')()

class UsersController {

    constructor() {
        UsersController.dirViews = path.join(__dirname, '../../public/windows/users/views')
    }

    init(root) {
        this.showInsertUsers(root)
    }

    showInsertUsers(root) {
        ejs.renderFile(`${UsersController.dirViews}/insert.ejs`, {}, (err, data) => root.innerHTML = data)
    }

    showManageUsers(root, callback) {
        usersDAO.selectAll().then(data => {
            ejs.renderFile(`${UsersController.dirViews}/manage.ejs`, { data }, (err, view) => {
                root.innerHTML = view
                callback(root, elementsDOM.setClickInCollection)
            })
        })
    }

    showEditUser(e, root, callback) {
        usersDAO.select(
            { id: elementsDOM.getAttributeData(e.target, 'id') }
        ).then( data => {
            let dataUser = data[0] ? data[0] : {};
            ejs.renderFile(`${UsersController.dirViews}/edit.ejs`, { 
                dataUser 
            }, (err, view) => {
                root.innerHTML = view
                callback(root)
            })
        })
    }

    setData(e){
        e.preventDefault()
        console.log('ok');
    }

    setStatus(e) {
        usersDAO.update(
            { id: elementsDOM.getAttributeData(e.target, 'id') },
            { status: elementsDOM.getAttributeData(e.target, 'status') }
        ).then(res => {
            if (res) elementsDOM.setElementCheck(e.target, 'status')
        })
    }

    setSuper(e) {
        usersDAO.update(
            { id: elementsDOM.getAttributeData(e.target, 'id') },
            { super: elementsDOM.getAttributeData(e.target, 'super') }
        ).then(res => {
            if (res) elementsDOM.setElementCheck(e.target, 'super')
        })
    }

}

module.exports = () => new UsersController();
