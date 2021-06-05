
exports.up = function(knex) {
  return knex.schema.createTable('carro', table => {
    table.increments('id')
    table.integer('id_client').notNullable()
    table.foreign('id_client').references('id').inTable('client')
    table.string('marca')
    table.string('modelo')
    table.string('ano')
    table.string('placa').notNullable()
    table.string('descricao_defeito').notNullable()

    table.timestamp('data').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('carro')
};
