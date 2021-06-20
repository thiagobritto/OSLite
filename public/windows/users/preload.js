
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
    clearMsg();
}

function managerPage(dataUsersParams)
{
    let file = path.join(__dirname,'views/manage.ejs')
    ejs.renderFile( file, {dataUsersParams}, (err, data ) => {
        document.getElementById('manager').innerHTML = data
    });
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
                    ipcRenderer.invoke('getDataUsers').then(data => {
                        dataUsers = data;
                        msgSucesso(`Usuario cadastrado com sucesso!`);
                    });
                }
            })

        } catch(err){
            msgError(err);
        }
    }
}
// aqui ...
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

function msgError(params){
    let errorShow = document.getElementById('error');
    errorShow.innerText = params;
    errorShow.style.color = 'red';
    errorShow.classList.add('errorShow');
}

function msgSucesso(params){
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