
const ejs = require('ejs')
const path = require('path')

const usersDAO = require('../models/DAO/usersDAO')('users')
const elementsDOM = require('../models/elementsDOM')()

dirViews = file => 
    path.join(__dirname, `../../public/windows/users/views/${file}`)

class UsersController {

    index(root) {
        UsersController.root = root
        return this
    }

    view(err, view){
        UsersController.root().innerHTML = view
    }

    showInsertUsers() {
        ejs.renderFile(dirViews('insert.ejs'), {}, this.view)
    }

    async showManageUsers() {
        let data = await usersDAO.getUsers()
        ejs.renderFile(dirViews('manage.ejs'), {data}, this.view)
        
        elementsDOM.setClickInCollection(
            UsersController.root().getElementsByClassName('super'),
            this.setSuper
        )

        elementsDOM.setClickInCollection(
            UsersController.root().getElementsByClassName('status'),
            this.setStatus
        )

        elementsDOM.setClickInCollection(
            UsersController.root().getElementsByClassName('edit'),
            (e) => this.showEditUser(e)
        )
    }

    async showEditUser(e) {
        let dataUser = await usersDAO.getUser(
            elementsDOM.getAttributeData(e.target, 'id')
        )
        
        ejs.renderFile(dirViews('edit.ejs'), {dataUser}, this.view)
        
        elementsDOM.setClick(
            UsersController.root().querySelector('#edit'),
            this.setData
        )
    }

    setData(e){
        e.preventDefault()
        console.log('data');
    }

    setStatus(e) {
        usersDAO.statusUpdate(
            elementsDOM.getAttributeData(e.target, 'id'),
            elementsDOM.getAttributeData(e.target, 'status')
        ).then( res => {
            if (res) elementsDOM.setElementCheck(e.target, 'status')
        })
    }

    setSuper(e) {
        usersDAO.superUpdate(
            elementsDOM.getAttributeData(e.target, 'id'),
            elementsDOM.getAttributeData(e.target, 'super')
        ).then( res => {
            if (res) elementsDOM.setElementCheck(e.target, 'super')
        })
    }

}

module.exports = () => new UsersController();
