
const ejs  = require('ejs')
const path = require('path')

const users = require('../models/DAO/usersDAO')('users')

class UsersController {

    constructor(){
        this.dirViews = path.join(__dirname, '../../public/windows/users/views')
    }

    init(root){
        this.showInsertUsers(root)
    }

    showInsertUsers(root){
        ejs.renderFile(`${this.dirViews}/insert.ejs`,{}, (err, data) => root.innerHTML = data )
    }

    showManageUsers(root){
        users.selectAll().then( data => {
            ejs.renderFile(`${this.dirViews}/manage.ejs`, {data}, (err, view) => {
                root.innerHTML = view
            })
        })
    }
    
}

module.exports = () => new UsersController();