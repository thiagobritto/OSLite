
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
        this.index(document())
    }

    index(doc) {
        ejs.renderFile(dir('insert'), {}, (error, view) => {
            doc.getElementById('root').innerHTML = view;
        })
        this.routesReload(doc);
    }

    cadastrar(doc){
        if (elementsDOM.isEmptyInputValues(doc.forms.cadastrar)){
            // valor vazio
            elementsDOM.msgError(
                doc.getElementById('error'),
                'Preencha todos os campos!'
            )
        } else {
            // valores ok
            elementsDOM.msgSucess(
                doc.getElementById('error'),
                'Cliente salvo com sucesso!'
            )
        }
        this.index(doc)
    }

}

module.exports = (document, routes) => new Client(document, routes)
