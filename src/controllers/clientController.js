
const ejs = require('ejs')
const path = require('path')

const clientDAO = require('../models/DAO/clientDAO')('client')
const elementsDOM = require('../models/elementsDOM')()

dir = file =>
path.join(__dirname, `../../public/windows/client/views/${file}.ejs`)

let Routes = require('./routesController')

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
            // valor vazio
            elementsDOM.msgError(
                event.document.getElementById('error'),
                'Preencha todos os campos!'
            )
        } else {
            clientDAO.insertClient(
                event.document.forms.cadastrar.name_client.value,
                event.document.forms.cadastrar.fone_client.value,
                event.document.forms.cadastrar.andress_client.value
            )
            // valores ok
            elementsDOM.msgSucess(
                event.document.getElementById('error'),
                'Cliente salvo com sucesso!'
            )
            this.index(event)
        }
    }

}

module.exports = (document, routes) => new Client(document, routes)
