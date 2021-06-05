
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('client').del()
    .then(function () {
      // Inserts seed entries
      return knex('client').insert([
        {name: 'thiago', fone: '7777-7777', andress: 'Rua 1'},
        {name: 'joão', fone: '8888-8888', andress: 'Rua 2'},
        {name: 'jose', fone: '9999-9999', andress: 'Rua 3'}
      ]);
    });
};
