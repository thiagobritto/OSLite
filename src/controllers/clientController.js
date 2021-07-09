
const ejs = require('ejs')
const path = require('path')

const clientDAO = require('../models/DAO/clientDAO')('client')
const clientModel = require('../models/clientModel')
const elementsDOM = require('../library/elementsDOM')()

dir = file =>
path.join(__dirname, `../../public/windows/client/views/${file}.ejs`)

class Client {
    
    constructor(document) {
        this.document = document
        this.index()
    }

    // pages
    index() {
        let document = this.document()
        ejs.renderFile(dir('insert'), {}, (error, view) => {
            document.getElementById('root').innerHTML = view;
        })
        document.getElementById('cadastrar').onclick = () => this.cadastrar()
    }

    manage() {
        let document = this.document()
        ejs.renderFile(dir('manage'), {}, (error, view) => {
            document.getElementById('root').innerHTML = view;
        })
        let search = document.forms.search.search_client
        let showBox = document.getElementById('show_client')
        let methodSearch = async () => {
            this.searchValue = search.value
            let searchData = await clientDAO.searchClient(this.searchValue)
            ejs.renderFile(dir('monteRow'), {searchData}, (error, view) => {
                showBox.innerHTML = view;
            })
        }
        search.value = this.searchValue ? this.searchValue : ''
        search.onkeyup = methodSearch
        search.onfocus = methodSearch
        search.focus()
 
        document.getElementById('editar').onclick = (e) => {
            if (e.target.getAttribute('data-id')){
                this.editar(e.target.getAttribute('data-id'))
            }
        }
        document.getElementById('excluirConfirm').onclick = (e) => {
            if (e.target.getAttribute('data-id')){
                this.excluir(e.target.getAttribute('data-id'))
            }
        }
    }

    // events
    cadastrar(){
        let document = this.document()
        if (elementsDOM.isEmptyInputValues(document.forms.cadastrar)){
            elementsDOM.msgError(
                document.getElementById('error'),
                'Preencha todos os campos!'
            )
        } else {
            let client = clientModel()
            .setName(document.forms.cadastrar.name_client.value)
            .setFone(document.forms.cadastrar.fone_client.value)
            .setAndress(document.forms.cadastrar.andress_client.value)
            .setNumber(document.forms.cadastrar.number_client.value)
            .setCode(document.forms.cadastrar.code_client.value)
            .setCity(document.forms.cadastrar.city_client.value)
            .setProvince(document.forms.cadastrar.province_client.value)
            clientDAO.insertClientModel(client).then( id => {
                elementsDOM.msgSucess(
                    document.getElementById('error'),
                    'Cliente salvo com sucesso!'
                )
                this.index()
            }).catch( err => {
                elementsDOM.msgError(
                    document.getElementById('error'),
                    'Erro ao entar inserir cliente'
                )
            })
        }
    }

    async editar(id){
        let document = this.document()
        let client = await clientDAO.getClient(id)

        ejs.renderFile(dir('edit'), {client}, (error, view) => {
            document.getElementById('root').innerHTML = view;
        })

        document.getElementById('voltar').onclick = (e) => this.manage()
        document.getElementById('salvar').onclick = (e) => {
            //console.log(e.target.getAttribute('data-id'));
            if (elementsDOM.isEmptyInputValues(document.forms.edition)){
                elementsDOM.msgError(
                    document.getElementById('error'),
                    'Preencha todos os campos!'
                )
            } else {
                let client = clientModel()
                .setName(document.forms.edition.name_client.value)
                .setFone(document.forms.edition.fone_client.value)
                .setAndress(document.forms.edition.andress_client.value)
                .setNumber(document.forms.edition.number_client.value)
                .setCode(document.forms.edition.code_client.value)
                .setCity(document.forms.edition.city_client.value)
                .setProvince(document.forms.edition.province_client.value)
                clientDAO.updateClientModel(id, client).then( id => {
                    elementsDOM.msgSucess(
                        document.getElementById('error'),
                        'Dados atualizados com sucesso!'
                    )
                    this.manage()
                }).catch( err => {
                    elementsDOM.msgError(
                        document.getElementById('error'),
                        'Erro ao tentar atualizar dados do cliente'
                    )
                })
            }
        }
    }

    excluir(id){
        clientDAO.deleteClient(id).then( res => {
            elementsDOM.msgSucess(
                document.getElementById('error'),
                'cliente excluido com sucesso!'
            )
            this.manage()
        }).catch( err => {
            elementsDOM.msgError(
                document.getElementById('error'),
                'Erro ao tentar excluir cliente'
            )
        })
    }

}

module.exports = (document) => new Client(document)
