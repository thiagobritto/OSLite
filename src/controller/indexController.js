const { ipcRenderer } = require('electron')

document.addEventListener("DOMContentLoaded", () => {
    try {
        setUserName()
        setBtnCadastro() 
    } catch (error) {
        console.error(error);
    }        
})

function setBtnCadastro() {
    const btn_cad_os = document.getElementById('btn_cad_os')
    const btn_cad_cliente = document.getElementById('btn_cad_cliente')
    const btn_cad_user = document.getElementById('btn_cad_user')

    btn_cad_os.onclick = () => windowCadastro({ 
        'controller': 'osController', 
        'view': 'os-cadastro' 
    })

    btn_cad_cliente.onclick = () => windowCadastro({ 
        'controller': 'clienteController', 
        'view': 'cliente-cadastro' 
    })

    btn_cad_user.onclick = () => windowCadastro({ 
        'controller': 'userController', 
        'view': 'user-cadastro' 
    })
}

function windowCadastro(params) {
    ipcRenderer.invoke('child', params)
}

async function setUserName() {
    const user = await ipcRenderer.invoke('user')
    document.getElementById('user_name').innerHTML = firstUp(user.name)
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