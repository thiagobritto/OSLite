
const { ipcRenderer } = require('electron')

const ejs = require('ejs')
const path = require('path')
let dataNow;

window.addEventListener('DOMContentLoaded', () => {
    getData().then( data => {
        dataNow = data
        document.getElementById('managerUser').onclick = () => managerPage(dataNow)
        document.getElementById('newUser').onclick = insertPage
        insertPage()
    })
})

async function getData(){
    return await ipcRenderer.invoke('getDataUsers')
}

function insertPage(){
    let file = path.join(__dirname,'views/insert.ejs')
    ejs.renderFile( file, {}, (err, data ) => {
        document.getElementById('manager').innerHTML = data
    })
    setInsertUser()
}

function setInsertUser(){
    document.getElementById('cadastrar').onclick = (e) => {
        e.preventDefault()
        try{
            let data = {
                username: document.getElementById('id_user').value,
                password: document.getElementById('id_pass').value,
                super: document.getElementById('id_admin').checked ? 1 : 0,
                status: document.getElementById('id_active').checked ? 1 : 0
            };
            
            for (let k in data) if (data[k] === '') throw 'Preencha totos os campos';

            if(data.password != document.getElementById('id_pass_conf').value)
            throw 'As senha não batem!';

            ipcRenderer.invoke('insertUser', data).then( res => {
                if (res[0] == undefined) throw 'Usuário já cadastrado!';
                document.location.reload(true)
            }).catch(err => {
                console.log(err);
            });

        } catch(err){
            console.log(err);
        }
    }
}

function managerPage(appData, init = 0, end = 5){

    let file = path.join(__dirname,'views/manage.ejs')
    ejs.renderFile( file, {appData, init, end}, (err, data ) => {
        document.getElementById('manager').innerHTML = data
    })
    
    editUser()

    let [...pageInd] = document.getElementsByClassName('page')
    pageInd.map(ind => {
        ind.onclick = () => {
            managerPage(
                dataNow,
                Number.parseInt(ind.getAttribute('data-init')),
                Number.parseInt(ind.getAttribute('data-end'))
            )
        }
    })

    setManageUser('setSuper', 'super')
    setManageUser('setStatus', 'status')
}

function setManageUser(inv, btn) {
    let [...elements] = document.getElementsByClassName(btn)
    elements.map( btn_elements => {
        btn_elements.onclick = function () {
            let id = this.getAttribute(`data-${btn}-id`)
            let value = this.getAttribute(`data-${btn}`)
            
            ipcRenderer.invoke(inv, {id, value}).then( results => {
                getData().then( data => {
                    dataNow = data
                    managerPage(dataNow)  
                })
            })    
        }
    })
}

function editUser(){
    let file = path.join(__dirname,'views/editUser.ejs')
    
    let [...btn_edit] = document.getElementsByClassName('edit-user')
    btn_edit.forEach( element => {
        element.onclick = () => {
            dataNow.forEach( dataUser => {
                if (element.getAttribute('data-id') == dataUser.id){
                    ejs.renderFile( file, { dataUser }, (err, data ) => {
                        document.getElementById('manager').innerHTML = data
                    })
                }
            })
        }
    })

}