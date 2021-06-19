
const database = require('../index');

class UsersDAO{
    constructor( tableNane ){
        this.tableNane = tableNane;
    }

    selectUser(where){
        return database.select().table(this.tableNane).where(where);
    }

    selectUsers(){
        return database.select().table(this.tableNane);
    }
}

module.exports = ( tableNane ) => new UsersDAO( tableNane )
