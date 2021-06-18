
const database = require('../index')

class UsersDAO{
    constructor( tableNane ){
        this.tableNane = tableNane;
    }

    async selectUserLogin(where){
        return await database.select().table(this.tableNane).where(where);
    }
}

module.exports = ( tableNane ) => new UsersDAO( tableNane )
