
const ejs  = require('ejs')
const path = require('path')

const usersDAO = require('../models/DAO/usersDAO')('users')
const elementsDOM = require('../models/elementsDOM')()

class UsersController {

    constructor(){
        this.dirViews = path.join(__dirname, '../../public/windows/users/views')
        this.root = {}
    }

    init(root){
        this.root = root
        this.showInsertUsers(root)
    }

    showInsertUsers(root){
        this.root = root
        ejs.renderFile(`${this.dirViews}/insert.ejs`,{}, (err, data) => root.innerHTML = data )
    }

    showManageUsers(root, callback){
        this.root = root
        usersDAO.selectAll().then( data => {
            ejs.renderFile(`${this.dirViews}/manage.ejs`, {data}, (err, view) => {
                root.innerHTML = view
                callback(root, elementsDOM.setClickInCollection)
            })
        })
    }

    setStatus(e){
        usersDAO.update(
            { id: e.target.getAttribute('data-status-id')  },
            { status: e.target.getAttribute('data-status') }
        ).then( res => {
            if (res) elementsDOM.setElementCheck(e.target, 'data-status')
        })
    }

    setSuper(e){
        usersDAO.update(
            { id: e.target.getAttribute('data-super-id') },
            { super: e.target.getAttribute('data-super') }
        ).then( res => {
            if (res) elementsDOM.setElementCheck(e.target, 'data-super')
        })
    }
    
}

module.exports = () => new UsersController();