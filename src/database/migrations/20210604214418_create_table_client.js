
exports.up = function(knex) {
  return knex.schema.createTable('client', table => {
    table.increments('id')
    table.text('name').notNullable()
    table.text('fone').notNullable()
    table.text('andress').notNullable()
    table.boolean('status').notNullable().defaultTo(1)
        
    table.timestamp('data').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('client')
};
