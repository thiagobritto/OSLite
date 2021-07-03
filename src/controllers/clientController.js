
const ejs = require('ejs')
const path = require('path')

const clientDAO = require('../models/DAO/clientDAO')('client')
const clientModel = require('../models/clientModel')
const elementsDOM = require('../library/elementsDOM')()

dir = file =>
path.join(__dirname, `../../public/windows/client/views/${file}.ejs`)

const Routes = require('../library/routes')

class Client extends Routes {
    constructor(document, routes) {
        super(document, routes);
        this.index({document: document()})
    }

    index(event) {
        ejs.renderFile(dir('insert'), {}, (error, view) => {
            event.document.getElementById('root').innerHTML = view;
        })
        this.routesReload(event.document);
    }

    cadastrar(event){
        if (elementsDOM.isEmptyInputValues(event.document.forms.cadastrar)){
            elementsDOM.msgError(
                event.document.getElementById('error'),
                'Preencha todos os campos!'
            )
        } else {
            let client = clientModel(
                event.document.forms.cadastrar.name_client.value,
                event.document.forms.cadastrar.fone_client.value,
                event.document.forms.cadastrar.andress_client.value,
                event.document.forms.cadastrar.number_client.value,
                event.document.forms.cadastrar.code_client.value,
                event.document.forms.cadastrar.city_client.value,
                event.document.forms.cadastrar.province_client.value
            )
            clientDAO.insertclientModel(client).then( id => {
                elementsDOM.msgSucess(
                    event.document.getElementById('error'),
                    'Cliente salvo com sucesso!'
                )
                this.index(event)
            }).catch( err => {
                elementsDOM.msgError(
                    event.document.getElementById('error'),
                    'Erro ao entar inserir cliente'
                )
            })

        }
    }

}

module.exports = (document, routes) => new Client(document, routes)
