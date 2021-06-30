
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
            (e) => this.prepareData(e).executeData(dataUser.id)
        )
        //voltar
        elementsDOM.setClick(
            UsersController.root().querySelector('#voltar'),
            (e) => this.showManageUsers()
        )
    }

    prepareData(e) {
        e.preventDefault()
        this.body = UsersController.root().parentNode
        this.hash = this.body.querySelector('#id_hash').value
        this.pass = this.body.querySelector('#id_pass').value
        this.conf = this.body.querySelector('#id_pass_conf').value
        this.status = this.body.querySelector('#id_status').checked
        this.superUser = this.body.querySelector('#id_super').checked
        return this
    }

    executeData(id) {
        if (this.hash == this.pass || this.hash == this.conf) {
            // nao salva senha
            usersDAO.dataUpdate(
                id,
                this.status,
                this.superUser
            ).then(res => {
                if (res) {
                    elementsDOM.msgSucess(
                        this.body.querySelector('#error'),
                        'Alterado com sucesso!'
                    )
                }
            })
        } else if (this.pass != this.conf) {
            // senhas nao batem
            elementsDOM.msgError(
                this.body.querySelector('#error'),
                'As senhas não batem!'
            )
        } else {
            // salva senha
            usersDAO.dataUpdate(
                id,
                this.status,
                this.superUser,
                this.pass
            ).then(res => {
                if (res) {
                    elementsDOM.msgSucess(
                        this.body.querySelector('#error'),
                        'Alterado com sucesso!'
                    )
                }
            })
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
