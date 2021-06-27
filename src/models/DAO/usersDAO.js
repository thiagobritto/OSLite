
const database = require('../../database');

class UsersDAO{
    constructor( tableNane ){
        this.tableNane = tableNane;
    }

    selectUser(where){
        return database.select().table(this.tableNane).where(where);
    }

    selectAll(){
        return database.select().table(this.tableNane); 
    }

    insert(data) {
        return database.insert(data).into(this.tableNane);
    }

    update(where, updateData){
        return database.where(where).update(updateData).table(this.tableNane);
    }
}

module.exports = ( tableNane ) => new UsersDAO( tableNane )
