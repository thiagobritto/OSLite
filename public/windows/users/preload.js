
const users = require('../../../src/controllers/usersController')()

window.addEventListener('DOMContentLoaded', () => {
    users.index(() => document.getElementById('root')).showInsertUsers()

    document.getElementById('insertUsers').onclick = e =>
        users.showInsertUsers(e)
    document.getElementById('manageUsers').onclick = e =>
        users.showManageUsers(e)
});
