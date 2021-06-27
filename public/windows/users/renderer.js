
let btn_managerUser = document.getElementById('manageUsers');
let btn_insertUser = document.getElementById('insertUsers')

btn_managerUser.onclick = () => {
    btn_managerUser.parentNode.classList.add('active')
    btn_insertUser.parentNode.classList.remove('active')
}

btn_insertUser.onclick = () => {
    btn_insertUser.parentNode.classList.add('active')
    btn_managerUser.parentNode.classList.remove('active')
}

