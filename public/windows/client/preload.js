
const clientController = require('../../../src/controllers/clientController')

window.addEventListener('DOMContentLoaded', () => {
    let client = clientController(() => document)
    document.getElementById('insert').onclick = () => client.index()
    document.getElementById('manage').onclick = () => client.manage()
})
