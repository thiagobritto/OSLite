
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
    });
    setPageInsertUser();
    clearMsg();
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
            throw 'As senhas divergem!';

            ipcRenderer.invoke('insertNewUser', data).then( res => {
                if (!res.status) {
                    msgError(`${res.error}, tente outro nome.`);
                } else {
                    ipcRenderer.invoke('getDataUsers').then( data => {
                        dataUsers = data;
                        msgSucess(`Usuario cadastrado com sucesso!`);
                    });
                }
            })

        } catch(err){
            msgError(err);
        }
    }
}

function managerPage(dataUsersParams)
{
    let file = path.join(__dirname,'views/manage.ejs')
    ejs.renderFile( file, {dataUsersParams}, (err, data ) => {
        document.getElementById('manager').innerHTML = data
    });
    setPageManageUser();
    clearMsg();
}

function setPageManageUser(){
    let [...btn_super] = document.getElementsByClassName('super');
    btnUpdateData(btn_super, btn => {
        return {
            id: btn.getAttribute('data-super-id'),
            data: {
                super: btn.getAttribute('data-super')
            }
        }
    });

    let [...btn_status] = document.getElementsByClassName('status');
    btnUpdateData(btn_status, btn => {
        return {
            id: btn.getAttribute('data-status-id'),
            data: {
                status: btn.getAttribute('data-status')
            }
        }
    });

    let [...btn_edit] = document.getElementsByClassName('edit-user');
    btnEditData(btn_edit);
}

function btnUpdateData(btn, call){
    btn.forEach( element => {
        element.onclick = function(){
            let data = call(this);
            ipcRenderer.invoke('updateUser', data).then( dataRes => {
                if (!dataRes.status) {
                    msgError(`${dataRes.error}`);
                } else {
                    ipcRenderer.invoke('getDataUsers').then( data => {
                        dataUsers = data;
                        managerPage(dataUsers);
                    });
                }
            });
        }
    });
}

function btnEditData(btn){
    btn.forEach( element => {
        element.onclick = function(){
            dataUsers.forEach( data => {
                if (data.id == this.getAttribute('data-id')) editPage(data);
            })
        }
    });
}

function editPage(dataUser){
    let file = path.join(__dirname,'views/editUser.ejs');
    ejs.renderFile( file, { dataUser }, (err, data ) => {
        document.getElementById('manager').innerHTML = data;
    });
    setPageEdittUser(dataUser);
}

function setPageEdittUser(dataUser){
    document.getElementById('efitar').onclick = (e) => {
        e.preventDefault();
        try{
            let data = {
                id: dataUser.id,
                data: {
                    super: document.getElementById('id_admin').checked ? 1 : 0,
                    status: document.getElementById('id_active').checked ? 1 : 0
                }
            };

            if(document.getElementById('id_pass').value != dataUser.password.substr(0,16)) 
                data.data.password = document.getElementById('id_pass').value;
            
            for (let k in data.data) if (data.data[k] === '') 
            throw 'Preencha totos os campos';

            if(document.getElementById('id_pass').value != document.getElementById('id_pass_conf').value)
            throw 'As senhas divergem!';    
            
            ipcRenderer.invoke('updateUser', data).then( dataRes => {
                if (!dataRes.status) {
                    msgError(`${dataRes.error}`);
                } else {
                    ipcRenderer.invoke('getDataUsers').then( data => {
                        dataUsers = data;
                        managerPage(dataUsers);
                    });
                }
            });

        } catch(err){
            msgError(err);
        }
    }
    document.getElementById('voltar').onclick = () => managerPage(dataUsers);
}

function msgError(params){
    let errorShow = document.getElementById('error');
    errorShow.innerText = params;
    errorShow.style.color = 'red';
    errorShow.classList.add('errorShow');
}

function msgSucess(params){
    let errorShow = document.getElementById('error');
    errorShow.innerText = params;
    errorShow.style.color = 'blue';
    errorShow.classList.add('errorShow');
}

function clearMsg(){
    let errorShow = document.getElementById('error');
    errorShow.innerText = '';
    errorShow.style.color = 'red';
    errorShow.classList.remove('errorShow');
}