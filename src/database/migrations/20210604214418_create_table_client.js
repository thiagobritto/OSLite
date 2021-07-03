
exports.up = function(knex) {
  return knex.schema.createTable('client', table => {
    table.increments('id').primary()
    table.text('name').notNullable()
    table.text('fone').notNullable()
    table.text('andress').notNullable()
    table.text('number').notNullable()
    table.text('code').notNullable()
    table.text('city').notNullable()
    table.text('province').notNullable()
      
    table.timestamp('data').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('client')
};
