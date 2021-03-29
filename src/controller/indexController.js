const { ipcRenderer } = require('electron')
const { connection  } = require('../DAO')
const { format      } = require('../resources/Format')

const formatData = format()

document.addEventListener("DOMContentLoaded", () => {
    try {
        
        setBtnCadastro(getById('btn_cad_os'), 'osController', 'os-cadastro')
        setBtnCadastro(getById('btn_cad_cliente'), 'clienteController', 'cliente-cadastro')

        setBtnUser(getById('btn_cad_user'), 'userController', 'user-cadastro')
        setBtnUser(getById('btn_rel_user'), 'userController', 'user-cadastro')

        setTbDashboard(connection())

    } catch (error) {
        console.error(error);
    }
})

function getById(id) {
    return document.getElementById(id)
}

function setBtnCadastro(btn, controller, view) {
    const obj = {
        'controller': controller,
        'view': view
    }
    btn.onclick = () => {
        ipcRenderer.invoke('child', obj)
    }
}

async function setBtnUser(btn, controller, view) {
    const data = await ipcRenderer.invoke('user')
    getById('user_name').innerHTML = formatData.firstUp(data.name)

    if (data.status) {
        btn.classList.remove("subheader")
        setBtnCadastro(btn, controller, view)
    }
}

async function setTbDashboard(conn) {
    const stmt = await conn('service')
        .join('cliente', 'service.id_cliente', 'cliente.id')
        .select('service.data', 'cliente.name', 'service.service', 'service.price')

    let rows = ''
    for (let value of stmt) {
        rows += `<tr>
            <td>${formatData.setData(value.data)}</td>
            <td>${value.name}</td>
            <td>${value.service}</td>
            <td>R$ ${formatData.formatMoeda(value.price)}</td>
        </tr>`
    }

    getById('tb_dashboard').innerHTML = rows
}
