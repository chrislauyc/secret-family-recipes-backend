
exports.seed = function(knex) {
  return knex('recipes').insert([
    {user_id: 1, category_name:"dinner", source_name:"grandma", recipe_name:"good stuff", image_url:"https://www.thewholesomedish.com/wp-content/uploads/2019/06/The-Best-Classic-Tacos-550.jpg"},
    {user_id: 1, category_name:"dessert", source_name:"sister", recipe_name:"really good stuff", image_url:"https://www.thewholesomedish.com/wp-content/uploads/2019/06/The-Best-Classic-Tacos-550.jpg"},
    {user_id: 2, category_name:"dessert", source_name:"brother", recipe_name:"yummy food", image_url:"https://www.thewholesomedish.com/wp-content/uploads/2019/06/The-Best-Classic-Tacos-550.jpg"},
  
  ]);
};
