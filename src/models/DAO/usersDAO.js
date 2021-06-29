
const { CRUD } = require('./CRUD');

class UsersDAO extends CRUD {
    constructor(tableNane) {
        super(tableNane)
    }
}

module.exports = (tableNane) => new UsersDAO(tableNane)
