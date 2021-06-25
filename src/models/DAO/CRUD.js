
const database = require('../index')

class CRUD{
    constructor(table){
        this.table = table
    }
    async list() {
        return await database(this.table).then( res => res ).catch( err => err )
    }
    async select(columns = []) {
        return await database.select(columns).table(this.table).then( res => res ).catch( err => err )
    }
    async selectWhere(where = {}) {
        return await database.select().table(this.table).where(where).then( res => res ).catch( err => err )
    }
    async selectLimitOffset(limit, offset = 0, columns = []) {
        return await database.select(columns).table(this.table).limit(limit).offset(offset).then( res => res ).catch( err => err )
    }
    async insert(data) {
        return await database.insert(data).into(this.table).then( res => res ).catch( err => err )
    }
    async update(where = {}, update = {}) {
        return await database.where(where).update(update).table(this.table)
    }
    async delete(where = {}) {
        return await database.where(where).delete().table(this.table).then( res => res ).catch( err => err )
    }
}

module.exports = (table) => new CRUD(table)
