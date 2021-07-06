

function selectRow(row, id){
    let [...rows] = row.parentNode.querySelectorAll('tbody tr')
    let editar = document.getElementById('editar')
    let excluir = document.getElementById('excluir')

    rows.forEach( element => {
        element.style.background = '#fff'
    })
    row.style.background = 'cyan';
    
    editar.href = `#editar/id:${id}`
    excluir.href = `#excluir/id:${id}`
    
}