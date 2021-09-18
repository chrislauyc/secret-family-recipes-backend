
exports.seed = function(knex) {
  return knex('users').insert([
    {username: 'john', email:"john@gmail.com", password:"this is a hashed token"},
    {username: 'tom', email:"tom@gmail.com", password:"this is a hashed token"},
    {username: 'sarah', email:"sarah@gmail.com", password:"this is a hashed token"},
  ]);
};
