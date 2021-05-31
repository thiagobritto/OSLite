
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table){
        table.increments('id')
        table.text('userName').unique().notNullable()
        table.text('password').unique().notNullable()

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
