
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'admin',
          password: '$2b$12$tLDR6WRn3.VbQ4DZfWlWa.pr/sdlK98mtdmWbHRzXfuuUu3y.VtYO',
          status: 1,
          super: 1
        },
        {
          username: 'adminNot',
          password: '$2b$12$tLDR6WRn3.VbQ4DZfWlWa.pr/sdlK98mtdmWbHRzXfuuUu3y.VtYO',
          status: 0,
          super: 1
        },
        {
          username: 'user',
          password: '$2b$12$tLDR6WRn3.VbQ4DZfWlWa.pr/sdlK98mtdmWbHRzXfuuUu3y.VtYO',
          status: 1,
          super: 0
        }
      ]);
    });
};
