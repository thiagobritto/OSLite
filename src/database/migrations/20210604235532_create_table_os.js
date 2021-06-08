
exports.up = function(knex) {
  return knex.schema.createTable('os', table => {
      table.increments('id').primary()
      table.integer('id_client').notNullable()
      table.foreign('id_client').references('id').inTable('client')
      table.integer('id_users').notNullable()
      table.foreign('id_users').references('id').inTable('users')
      
      table.string('service').notNullable().defaultTo(1)
      table.integer('status').notNullable().defaultTo(1)
      table.decimal('price', 10, 2).notNullable()
      table.timestamp('data').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('os')
};
