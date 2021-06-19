
const { ipcRenderer } = require('electron')

const ejs = require('ejs');
const path = require('path');

let dataUsers;

window.addEventListener('DOMContentLoaded', async () => {
    dataUsers = await ipcRenderer.invoke('getDataUsers');
    document.getElementById('newUser').onclick = insertPage;
    document.getElementById('managerUsers').onclick = () => managerPage(dataUsers);
    insertPage();
});

function insertPage()
{
    let file = path.join(__dirname,'views/insert.ejs');
    ejs.renderFile( file, {}, (err, data ) => {
        document.getElementById('manager').innerHTML = data;
    })
    setPageInsertUser();
}

function managerPage(dataUsersParams)
{
    let file = path.join(__dirname,'views/manage.ejs')
    ejs.renderFile( file, {dataUsersParams}, (err, data ) => {
        document.getElementById('manager').innerHTML = data
    });
}

function setPageInsertUser()
{
    document.getElementById('cadastrar').onclick = (e) => {
        e.preventDefault();
        try{
            let data = {
                username: document.getElementById('id_user').value,
                password: document.getElementById('id_pass').value,
                super: document.getElementById('id_admin').checked ? 1 : 0,
                status: document.getElementById('id_active').checked ? 1 : 0
            };
            
            for (let k in data) if (data[k] === '') 
            throw 'Preencha totos os campos';

            if(data.password != document.getElementById('id_pass_conf').value)
            throw 'As senhas não batem!';

            ipcRenderer.invoke('insertUser', data).then( res => {
                if (res[0] == undefined) throw 'Usuário já cadastrado!';
                document.location.reload(true);
            }).catch(err => {
                console.log(err);
            });

        } catch(err){
            console.log(err);
        }
    }
}

function setPaginationManagePage(){
    let [...pageInd] = document.getElementsByClassName('page');
    
    pageInd.map(ind => {
        ind.onclick = () => {
            managerPage(
                dataUsers,
                Number.parseInt(ind.getAttribute('data-init')),
                Number.parseInt(ind.getAttribute('data-end'))
            );
        }
    });
}

function setManageSuperStatus(btn, btnCall) {
    let [...elements] = document.getElementsByClassName(btn);
    elements.map( btn_elements => {
        btn_elements.onclick = () => btnCall(btn_elements);
    })
}

function editPage(){
    let file = path.join(__dirname,'views/editUser.ejs');
    let [...btn_edit] = document.getElementsByClassName('edit-user');
    let userDataEdit;

    btn_edit.forEach( element => {
        element.onclick = () => {
            dataNow.forEach( dataUser => {
                if (element.getAttribute('data-id') == dataUser.id){
                    userDataEdit = dataUser;
                    ejs.renderFile( file, { dataUser }, (err, data ) => {
                        document.getElementById('manager').innerHTML = data
                        setEditUser(dataUser)
                    })
                }
            })
        }
    })
    
}

function setEditUser(dataUser){
    document.getElementById('efitar').onclick = (e) => {
        e.preventDefault()
        try{
            let data = {
                userName: document.getElementById('id_user').value,
                super: document.getElementById('id_admin').checked ? 1 : 0,
                status: document.getElementById('id_active').checked ? 1 : 0
            };
            
            for (let k in data) if (data[k] === '') throw 'Preencha totos os campos';

            if(document.getElementById('id_pass').value != document.getElementById('id_pass_conf').value)
                throw 'As senhas não batem!';

            if (dataUser.password.substr(0,16) != document.getElementById('id_pass').value){
                data.password = document.getElementById('id_pass').value
            }

            ipcRenderer.invoke('updateUser', { id: dataUser.id, data }).then( res => {
                getDataUsers().then( data => {
                    dataNow = data
                    managerPage(dataNow)  
                })
            }).catch(err => {
                console.log(err);
            });

        } catch(err){
            console.log(err);
        }
    }
}