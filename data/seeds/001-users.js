
exports.seed = function(knex) {
  return knex('users').insert([
    {username: 'john', email:"john@gmail.com", password:"hfp0qiwubvpq"},
    {username: 'tom', email:"tom@gmail.com", password:"oasidvbasod"},
    {username: 'sarah', email:"sarah@gmail.com", password:"aosiduvba"},
  ]);
};
