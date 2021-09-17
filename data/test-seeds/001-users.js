
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {user_id: 1, username: 'john', email:"john@gmail.com", password:"this is a hashed token"},
        {user_id: 2, username: 'tom', email:"tom@gmail.com", password:"this is a hashed token"},
        {user_id: 3, username: 'sarah', email:"sarah@gmail.com", password:"this is a hashed token"},
      ]);
    });
};
