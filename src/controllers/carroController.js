
const ejs = require('ejs')
const path = require('path')

const clientDAO = require('../models/DAO/clientDAO')('client')
const carroDAO = require('../models/DAO/carroDAO')('carro')
//const carroModel = require('../models/')
const elementsDOM = require('../library/elementsDOM')()

dir = file =>
path.join(__dirname, `../../public/windows/carro/views/${file}.ejs`)

class Carro {
    
    constructor(document) {
        this.document = document
        this.index()
    }

    // pages
    index() {
        let document = this.document()
        ejs.renderFile(dir('manage'), {}, (error, view) => {
            document.getElementById('root').innerHTML = view;
        })
        let search = document.forms.client.client_carro
        let showBox = document.getElementById('show_client')
        let methodSearch = async () => {
            this.searchValue = search.value
            if (this.searchValue == ''){
                showBox.style.display = 'none';
            }else{
                let searchData = await clientDAO.searchClient(this.searchValue)
                ejs.renderFile(dir('monteRow'), {searchData}, (error, view) => {
                    showBox.innerHTML = view;
                    showBox.style.display = 'block';
                })
                elementsDOM.setClickInCollection(showBox.querySelectorAll('li'), 
                event => this.setCarros(event.target.getAttribute('data-id')))
            }
        }
        search.value = this.searchValue ? this.searchValue : ''
        search.onkeyup = methodSearch
        
    }

    setCarros(clientId) {
        let document = this.document()
        console.log(clientId);        
    }
}

module.exports = (document) => new Carro(document)
