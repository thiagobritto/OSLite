
function modal(element) {
    
    if (!element.getAttribute('data-name')) return false
    
    let modal = document.querySelectorAll('.modal');
    let title = modal[0].querySelector('#titleModal')
    title.innerText = element.getAttribute('data-name')
    let instanceModal = M.Modal.init(modal);

}

function selectRow(row, id) {
    let [...rows] = row.parentNode.querySelectorAll('tbody tr')
    let editar = document.getElementById('editar')
    let excluir = document.getElementById('excluir')
    let excluirConfirm = document.getElementById('excluirConfirm')

    rows.forEach(element => {
        element.style.background = '#fff'
    })
    row.style.background = 'cyan';

    editar.setAttribute('data-id', id)
    excluir.setAttribute('data-name', row.getElementsByTagName('td')[1].innerText)
    excluirConfirm.setAttribute('data-id', id)
}
