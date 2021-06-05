
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('carro').del()
    .then(function () {
      // Inserts seed entries
      return knex('carro').insert([
        {
          id_client: 2, 
          marca: 'toyota',
          modelo: 'hilux',
          ano: '2018',
          placa: 'hjh-0255',
          descricao_defeito: 'não pega, partida pesada'
        },
        {
          id_client: 3, 
          marca: 'fiat',
          modelo: 'palio',
          ano: '2012',
          placa: 'mya-2055',
          descricao_defeito: 'não pisca para direita'
        }
      ]);
    });
};
