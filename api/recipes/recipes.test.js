const request = require("supertest");
const server = require("../server");
const db = require("../../data/data-config");
const jwt = require("jsonwebtoken");

const recipe = {
  recipe_id:1,
  user_id:1,
  source:"grandmother",
  category:"dinner",
  recipe_name:"tacos",
  image_url:"https://www.thewholesomedish.com/wp-content/uploads/2019/06/The-Best-Classic-Tacos-550.jpg",
  steps:[
      {
        description:"cook them",
        ingredients:[
            {
                ingredient_name:"taco shell",
                amount:10,
                unit:"none"
            },
            {
                ingredient_name:"miced beef",
                amount:125,
                unit:"gram"
            }
        ]
      }
  ]
}
const invalid = {
  recipe_id:1,
  user_id:1,
  source:"grandmother",
  category:"dinner",
  image_url:"https://www.thewholesomedish.com/wp-content/uploads/2019/06/The-Best-Classic-Tacos-550.jpg",
  steps:[
      {
        description:"cook them",
        ingredients:[
            {
                ingredient_name:"taco shell",
                amount:10,
                unit:"none"
            },
            {
                ingredient_name:"miced beef",
                amount:125,
                unit:"gram"
            }
        ]
      }
    ]
}
beforeEach(async()=>{
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
});
afterAll(async()=>{
  await db.destroy();
});

jwt.sign = jest.fn(()=>"signed by jsonwebtoken");
jwt.verify = jest.fn((token)=>{
  if(token !== "valid token"){
    throw Error();
  }
  else{
    return {
      user_id:1,
      username:"join",
      email:"john@gmail.com"
    };
  }
})

describe("[GET] /api/:user_id/recipes",()=>{
  test("[1] responds with 401 if token is missing or invalid",async()=>{
    const res = await request(server).get("/api/1/recipes").set("Authorization","invalid token");
    expect(res.status).toBe(401);
  });
  test("[2] responds with 404 if user_id not found",async()=>{
    const res = await request(server).get("/api/100/recipes").set("Authorization","valid token");
    expect(res.status).toBe(404);
  });
  test("[3] responds with 200 the correct number of rows",async()=>{
    res = await request(server).get("/api/1/recipes").set("Authorization","valid token");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength((await db("recipes").where({user_id:1})).length);
  });
  test("[4] responds with the correct format",async()=>{
    res = await request(server).get("/api/1/recipes").set("Authorization","valid token");
    const data = res.body;
    expect(data).toHaveLength(2);
    const recipe = data[0];
    expect(recipe).toHaveProperty("recipe_id");
    expect(recipe).toHaveProperty("user_id");
    expect(recipe).toHaveProperty("source");
    expect(recipe).toHaveProperty("category");
    expect(recipe).toHaveProperty("recipe_name");
    expect(recipe).toHaveProperty("image_url");
    expect(recipe).toHaveProperty("steps");

    expect(recipe.steps).toHaveLength(3);

    const step = recipe.steps[0];

    expect(step).toHaveProperty("description");
    expect(step).toHaveProperty("ingredients");

    expect(step.ingredients).toHaveLength(1);

    const ingredient = step.ingredients[0];

    expect(ingredient).toHaveProperty("ingredient_name");
    expect(ingredient).toHaveProperty("amount");
    expect(ingredient).toHaveProperty("unit");
  });
});
  
describe("[POST] /api/:user_id/recipes",()=>{

  test("[1] responds with 401 if token is missing or invalid",async()=>{
    const res = await request(server).post("/api/1/recipes").set("Authorization","invalid token").send(recipe);
    expect(res.status).toBe(401);
  });
  test("[2] responds with 404 if user_id not found",async()=>{
    const res = await request(server).post("/api/100/recipes").set("Authorization","valid token").send(recipe);
    expect(res.status).toBe(404);
  });
  test("[3] created object in db with 201",async()=>{
    const {recipe_id} = await db("recipes").select("recipe_id").orderBy("recipe_id","desc").first();

    const res = await request(server).post("/api/1/recipes").set("Authorization","valid token").send(recipe);
    expect(res.body.recipe_id).toBe(recipe_id+1);
    expect(await db("recipes").where({recipe_id:recipe_id+1})).toHaveLength(1);
  });
  test("[4] responds with 400 if body is missing or invalid",async()=>{
 

    const res = await request(server).post("/api/1/recipes").set("Authorization","valid token").send(invalid);
    expect(res.status).toBe(400);
  });
});
  
  describe("[GET] /api/:user_id/recipes/:recipe_id",()=>{
    test("[1] responds with 401 if token is missing or invalid",async()=>{
      const res = await request(server).get("/api/1/recipes/1").set("Authorization","invalid token");
      expect(res.status).toBe(401);
    });
    test("[2] responds with 401 if token is valid but recipe does not belong to user",async()=>{
      const res = await request(server).get("/api/1/recipes/3").set("Authorization","valid token");
      expect(res.status).toBe(401);
    })
    test("[3] responds with 404 if user_id not found",async()=>{
      const res = await request(server).get("/api/100/recipes").set("Authorization","valid token");
      expect(res.status).toBe(404);
    });
    test("[4] responds with 200 if valid",async()=>{
      const res = await request(server).get("/api/1/recipes/1").set("Authorization","valid token");
      expect(res.status).toBe(200);
    })
  });
  
  describe("[PUT] /api/:user_id/recipes/:recipe_id",()=>{
    test("[1] responds with 200",async()=>{
      const res = await request(server).put("/api/1/recipes/1").set("Authorization","valid token").send({...recipe,recipe_name:"updated name"});
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({recipe_id:1});
    });
    test("[2] updated db",async()=>{
      const res = await request(server).put("/api/1/recipes/1").set("Authorization","valid token").send({...recipe,recipe_name:"updated name"});
      expect(await db("recipes").where({recipe_id:1}).first()).toMatchObject({
        recipe_name:"updated name",
      });

    })
  });
  
  describe("[DELETE] /api/:user_id/recipes/:recipe_id",()=>{
    test("[1] responds with 200",async()=>{
      const res = await request(server).delete("/api/1/recipes/1").set("Authorization","valid token");
      expect(await db("recipes").where({recipe_id:1})).toHaveLength(0);
    })
  });