
const database = require('../../database')

module.exports = class CRUD{

    constructor(tableNane) {
        this.tableNane = tableNane;
    }

    select(where, columns = []) {
        return database.select(columns).table(this.tableNane).where(where);
    }

    selectAll(columns = []) {
        return database.select(columns).table(this.tableNane);
    }

    like(column, value){
        return database(this.tableNane).where(column, 'like', `%${value}%`)
    }

    insert(data) {
        return database.insert(data).into(this.tableNane);
    }

    update(where, updateData) {
        return database.where(where).update(updateData).table(this.tableNane);
    }

    delete(where = {}) {
        return database.where(where).delete().table(this.tableNane);
    }
    
}
