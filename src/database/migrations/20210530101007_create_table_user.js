
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table){
        table.increments('id').primary()
        table.text('userName').unique().notNullable()
        table.text('password').notNullable()
        table.boolean('status').notNullable().defaultTo(0)
        table.boolean('super').notNullable().defaultTo(0)
        
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
