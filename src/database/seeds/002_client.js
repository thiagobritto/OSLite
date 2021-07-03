
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('client').del()
    .then(function () {
      // Inserts seed entries
      return knex('client').insert([
        {
          name: 'thiago', 
          fone: '7777-7777', 
          andress: 'Rua', 
          number: '1', 
          code: '59280-000', 
          city: 'jandaira', 
          province: 'RN'
        },
        {
          name: 'joão', 
          fone: '8888-8888', 
          andress: 'Rua', 
          number: '2', 
          code: '59255-000', 
          city: 'santo antonio', 
          province: 'RN'
        },
        {
          name: 'jose', 
          fone: '9999-9999', 
          andress: 'Rua', 
          number: '3', 
          code: '59275-000', 
          city: 'sao jose de mipibu', 
          province: 'RN'
        }
      ]);
    });
};
