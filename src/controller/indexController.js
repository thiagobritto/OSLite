const { ipcRenderer } = require('electron')
const { connection } = require('../DAO')

document.addEventListener("DOMContentLoaded", () => {
    try {
        setBtnUser()
        setBtnCadastro()
        setTbDashboard(connection())
    } catch (error) {
        console.error(error);
    }
})

function setBtnCadastro() {
    const btn_cad_os = document.getElementById('btn_cad_os')
    const btn_cad_cliente = document.getElementById('btn_cad_cliente')

    btn_cad_os.onclick = () => windowCadastro({
        'controller': 'osController',
        'view': 'os-cadastro'
    })

    btn_cad_cliente.onclick = () => windowCadastro({
        'controller': 'clienteController',
        'view': 'cliente-cadastro'
    })
}

function windowCadastro(params) {
    ipcRenderer.invoke('child', params)
}

async function setBtnUser() {
    const data = await ipcRenderer.invoke('user')
    document.getElementById('user_name').innerHTML = firstUp(data.name)

    const btn_cad_user = document.getElementById('btn_cad_user')
    const btn_rel_user = document.getElementById('btn_rel_user')
    if (data.status) {
        btn_cad_user.classList.remove("subheader")
        btn_rel_user.classList.remove("subheader")

        btn_cad_user.onclick = () => windowCadastro({
            'controller': 'userController',
            'view': 'user-cadastro'
        })
    }
}

async function setTbDashboard(conn) {
    const stmt = await conn('service').join('cliente', 'service.id_cliente', 'cliente.id')
        .select('service.data', 'cliente.name', 'service.service', 'service.price')

    let rows = ''
    for (let value of stmt) {
        rows += `<tr>
            <td>${setData(value.data)}</td>
            <td>${value.name}</td>
            <td>${value.service}</td>
            <td>R$ ${formatMoeda(value.price)}</td>
        </tr>`
    }

    document.getElementById('tb_dashboard').innerHTML = rows
}

function setData(params) {
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
    let data = new Date(params)
    let dataFormatada = ((data.getDate() + " " + meses[(data.getMonth())] + " " + data.getFullYear()))
    return dataFormatada
    //saída: 31 Dez 2019
}

function formatMoeda(moeda) {
    moeda = parseFloat(moeda)
    //com R$
    //let moedaformatR$ = moeda.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    //sem R$
    let moedaformat = moeda.toLocaleString('pt-br', { minimumFractionDigits: 2 })
    return moedaformat
}

function firstUp(str) {
    let newStr
    for (let x in str) {
        if (x <= 0) {
            newStr = str[x].toUpperCase()
        } else {
            newStr += str[x]
        }
    }
    return newStr
}