
const { ipcRenderer } = require('electron')

const ejs = require('ejs')
const path = require('path')

window.addEventListener('DOMContentLoaded', () => {
    getData().then( data => {
        document.getElementById('managerUser').onclick = () => managerPage(data)
        document.getElementById('newUser').onclick = insertPage
        insertPage()
    })
})

async function getData(){
    return await ipcRenderer.invoke('getDataUsers').then( results => results )
}

function insertPage(){
    let file = path.join(__dirname,'views/insert.ejs')
    ejs.renderFile( file, {}, (err, data ) => {
        document.getElementById('manager').innerHTML = data
    })
    insertUser()
}

function insertUser(){
    document.getElementById('cadastrar').onclick = (e) => {
        e.preventDefault()
        try{
            let data = {
                name: document.getElementById('id_user').value,
                pass: document.getElementById('id_pass').value,
                confirme: document.getElementById('id_pass_conf').value,
                admin: document.getElementById('id_admin').checked,
                status: document.getElementById('id_active').checked
            }
            for (let key in data){
                if (data[key] === "") throw 'Preencha todos os campos! '+key;
            }
            let results = ipcRenderer.invoke('insertUser', data).then( results => results)
            if (!results) throw 'Erro ao incerir registro!';
            
            console.log('os');

        } catch(err){
            console.log(err);
        }
    }
}

function managerPage(appData){
    let file = path.join(__dirname,'views/manage.ejs')
    ejs.renderFile( file, {appData}, (err, data ) => {
        document.getElementById('manager').innerHTML = data
    })
    manageUser('setSuper', 'super')
    manageUser('setStatus', 'status')
}

function manageUser(inv, btn) {
    let [...elements] = document.getElementsByClassName(btn)
    elements.map( btn_elements => {
        btn_elements.onclick = function () {
            let data = { userId: this.getAttribute(`data-${btn}-id`), data: {} }
            data.data[btn] = this.getAttribute(`data-${btn}`)
            
            console.log(data);
            ipcRenderer.invoke(inv, data).then( results => {
                if (results){
                    getData().then( dataAll => {
                        managerPage(dataAll)
                    })                 
                }
            })    
        }
    })
}