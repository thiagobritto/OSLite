
const { ipcRenderer } = require('electron')

const ejs = require('ejs')
const path = require('path')
let dataUser

window.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.invoke('getDataUsers').then( results => dataUser = results )
    document.getElementById('managerUser').onclick = () => managerPage(dataUser)
    document.getElementById('newUser').onclick = insertPage
    insertPage()
})

function insertPage(){
    let file = path.join(__dirname,'views/insert.ejs')
    ejs.renderFile( file, {}, (err, data ) => {
        document.getElementById('manager').innerHTML = data
    })
}

function managerPage(appData){
    let file = path.join(__dirname,'views/manage.ejs')
    ejs.renderFile( file, {appData}, (err, data ) => {
        document.getElementById('manager').innerHTML = data
    })
}