

function setBtn(element, id){
    document.getElementById('id_name').value = element.innerText
    element.parentNode.style.display = 'none';
    
    let adicionar = document.getElementById('adicionar')
    let remover = document.getElementById('remover')

    adicionar.setAttribute('data-client', id)
    remover.setAttribute('data-client', id)
}