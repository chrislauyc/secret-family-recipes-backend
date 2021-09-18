
exports.seed = function(knex) {
  return knex('recipes').insert([
    {user_id: 1, category_id:1, source_id:1, recipe_name:"good stuff", image_url:"https://www.thewholesomedish.com/wp-content/uploads/2019/06/The-Best-Classic-Tacos-550.jpg"},
    {user_id: 1, category_id:1, source_id:2, recipe_name:"really good stuff", image_url:"https://www.thewholesomedish.com/wp-content/uploads/2019/06/The-Best-Classic-Tacos-550.jpg"},
  ]);
};
