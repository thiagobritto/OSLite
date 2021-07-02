
const clientController = require('../../../src/controllers/clientController')

let client, routes = [
    'cadastrar'
]

window.addEventListener('DOMContentLoaded', () => {
    client = clientController(() => document, routes)
});
