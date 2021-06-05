
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('os').del()
    .then(function () {
      // Inserts seed entries
      return knex('os').insert([
        {
          id_client: 2, 
          id_users: 1,
          service: 'troca do induzido',
          status: 1,
          price: 151.55
        },
        {
          id_client: 3, 
          id_users: 1,
          service: 'troca do fusivel queimado',
          status: 1,
          price: 15.25
        }
      ]);
    });
};
