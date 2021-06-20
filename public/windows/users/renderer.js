
let btn_managerUser = document.getElementById('managerUsers');
let btn_insertUser = document.getElementById('newUser')

btn_managerUser.onclick = () => {
    btn_managerUser.parentNode.classList.add('active')
    btn_insertUser.parentNode.classList.remove('active')
}

btn_insertUser.onclick = () => {
    btn_insertUser.parentNode.classList.add('active')
    btn_managerUser.parentNode.classList.remove('active')
}

