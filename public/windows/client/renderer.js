
let btn_manage = document.getElementById('manage');
let btn_insert = document.getElementById('insert')

btn_manage.onclick = () => {
    btn_manage.parentNode.classList.add('active')
    btn_insert.parentNode.classList.remove('active')
}

btn_insert.onclick = () => {
    btn_insert.parentNode.classList.add('active')
    btn_manage.parentNode.classList.remove('active')
}

