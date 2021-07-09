
const carroController = require('../../../src/controllers/carroController')

window.addEventListener('DOMContentLoaded', () => {
    let carro = carroController(() => document)
    document.getElementById('insert').onclick = () => carro.index()
    document.getElementById('manage').onclick = () => carro.manage()
})
