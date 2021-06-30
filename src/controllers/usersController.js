
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

    view(err, view) {
        UsersController.root().innerHTML = view
    }

    showInsertUsers() {
        ejs.renderFile(dirViews('insert.ejs'), {}, this.view)
    }

    async showManageUsers() {
        let data = await usersDAO.getUsers()
        ejs.renderFile(dirViews('manage.ejs'), { data }, this.view)

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

        ejs.renderFile(dirViews('edit.ejs'), { dataUser }, this.view)

        elementsDOM.setClick(
            UsersController.root().querySelector('#edit'),
            (e) => this.setData(e, dataUser.id)
        )
    }

    setData(e, id) {
        e.preventDefault()
        let body = UsersController.root().parentNode
        let hash = body.querySelector('#id_hash').value
        let pass = body.querySelector('#id_pass').value
        let conf = body.querySelector('#id_pass_conf').value

        console.log(body);
        if (hash == pass || hash == conf) {
            // nao salva senha
            console.log('nao salva senha');
        } else if (pass != conf) {
            // senhas nao batem
            elementsDOM.msgError(
                body.querySelector('#error'),
                'As senhas não batem!'
            )
        } else {
            // salva senha
            console.log('salva senha');
        }
    }

    setStatus(e) {
        usersDAO.statusUpdate(
            elementsDOM.getAttributeData(e.target, 'id'),
            elementsDOM.getAttributeData(e.target, 'status')
        ).then(res => {
            if (res) elementsDOM.setElementCheck(e.target, 'status')
        })
    }

    setSuper(e) {
        usersDAO.superUpdate(
            elementsDOM.getAttributeData(e.target, 'id'),
            elementsDOM.getAttributeData(e.target, 'super')
        ).then(res => {
            if (res) elementsDOM.setElementCheck(e.target, 'super')
        })
    }

}

module.exports = () => new UsersController();
