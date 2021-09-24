const request = require("supertest");
const server = require("../server");
const db = require("../../data/data-config");
const jwt = require("jsonwebtoken");
const {
  valid1,
  valid2,
  valid3,
  valid4,
  valid5,
  valid6,
  valid7
} = require("./valid-data");
const {
  invalid3, invalid4, invalid5, invalid6
} = require("./invalid-data");
// const recipe = {
//   recipe_id:1,
//   user_id:1,
//   source:"grandmother",
//   category:"dinner",
//   recipe_name:"tacos",
//   image_url:"https://www.thewholesomedish.com/wp-content/uploads/2019/06/The-Best-Classic-Tacos-550.jpg",
//   steps:[
//       {
//         description:"cook them",
//         ingredients:[
//             {
//                 ingredient_name:"taco shell",
//                 amount:10,
//                 unit:"none"
//             },
//             {
//                 ingredient_name:"miced beef",
//                 amount:125,
//                 unit:"gram"
//             }
//         ]
//       }
//   ]
// }
const recipe = {
  // user_id:1,
  source:"grandmother",
  category:"dinner",
  recipe_name:"tacos",
  image_url:"https://someimage.jpg",
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
  jwt.sign = jest.fn(()=>"signed by jsonwebtoken");
  jwt.verify = jest.fn((token)=>{
    if(token !== "valid token"){
      throw Error(JSON.stringify(token));
    }
    else{
      return {
        user_id:1,
        username:"join",
        email:"john@gmail.com"
      };
    }
  })
});
afterAll(async()=>{
  await db.destroy();
});



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
    let res = await request(server).get("/api/1/recipes").set("Authorization","valid token");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength((await db("recipes").where({user_id:1})).length);
    jwt.verify = jest.fn((token)=>{
      if(token !== "valid token"){
        throw Error(JSON.stringify(token));
      }
      else{
        return {
          user_id:2,
          username:"tom",
          email:"tom@gmail.com"
        };
      }
    })
    res = await request(server).get("/api/2/recipes").set("Authorization","valid token");
    expect(res.status).toBe(200);
  });
  test("[4] responds with the correct format",async()=>{
    let res = await request(server).get("/api/1/recipes").set("Authorization","valid token");
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
    expect(res.status).toBe(201)
  });
  test("[4] responds with 400 if body is missing or invalid",async()=>{
 

    const res = await request(server).post("/api/1/recipes").set("Authorization","valid token").send(invalid3);
    expect(res.status).toBe(400);
  });
  test("[5] recipe_name must be unique for the same user but can be duplicated for different users",async()=>{
    let res = await request(server).post("/api/1/recipes").set("Authorization","valid token").send(recipe);
    expect(res.status).toBe(201);
    res = await request(server).post("/api/1/recipes").set("Authorization","valid token").send(recipe);
    expect(res.status).toBe(400);
    jwt.verify = jest.fn((token)=>{
      if(token !== "valid token"){
        throw Error(JSON.stringify(token));
      }
      else{
        return {
          user_id:2,
          username:"tom",
          email:"tom@gmail.com"
        };
      }
    })
    res = await request(server).post("/api/2/recipes").set("Authorization","valid token").send(recipe);
    
    expect(res.status).toBe(201);
  })
  test("[6a] responds with 400 with invalid3",async()=>{
    let res = await request(server).post("/api/1/recipes").set("Authorization","valid token").send(invalid3);
    expect(res.status).toBe(400);
  })
  test("[6b] responds with 400 with invalid4",async()=>{
    let res = await request(server).post("/api/1/recipes").set("Authorization","valid token").send(invalid4);
    expect(res.status).toBe(400);
  })
  test("[6c] responds with 400 with invalid5",async()=>{
    let res = await request(server).post("/api/1/recipes").set("Authorization","valid token").send(invalid5);
    if(res.status !== 400){
      expect(res.body).toBe("")
    }
    expect(res.status).toBe(400);
  })
  test("[6d] responds with 400 with invalid6",async()=>{
    let res = await request(server).post("/api/1/recipes").set("Authorization","valid token").send(invalid6);
    if(res.status !== 400){
      expect(res.body).toBe("")
    }
    expect(res.status).toBe(400);
  })
  test("[7a] responds with 201 with valid1",async()=>{
    let res = await request(server).post("/api/1/recipes").set("Authorization","valid token").send(valid1);
    expect(res.status).toBe(201);
  })
  test("[7b] responds with 201 with valid2",async()=>{
    let res = await request(server).post("/api/1/recipes").set("Authorization","valid token").send(valid2);
    expect(res.status).toBe(201);
  })
  test("[7c] responds with 201 with valid3",async()=>{
    let res = await request(server).post("/api/1/recipes").set("Authorization","valid token").send(valid3);
    if(res.status !== 201){
      expect(res.body).toBe("")
    }
    expect(res.status).toBe(201);
  })
  test("[7d] responds with 201 with valid4",async()=>{
    let res = await request(server).post("/api/1/recipes").set("Authorization","valid token").send(valid4);
    if(res.status !== 201){
      expect(res.body).toBe("")
    }
    expect(res.status).toBe(201);
  })
  test("[7e] responds with 201 with valid5",async()=>{
    let res = await request(server).post("/api/1/recipes").set("Authorization","valid token").send(valid5);
    if(res.status !== 201){
      expect(res.body).toBe("")
    }
    expect(res.status).toBe(201);
  })
  test("[7f] responds with 201 with valid6",async()=>{
    let res = await request(server).post("/api/1/recipes").set("Authorization","valid token").send(valid6);
    if(res.status !== 201){
      expect(res.body).toBe("")
    }
    expect(res.status).toBe(201);
  })
  test("[7g] responds with 201 with valid7",async()=>{
    let res = await request(server).post("/api/1/recipes").set("Authorization","valid token").send(valid7);
    if(res.status !== 201){
      expect(res.body).toBe("")
    }
    expect(res.status).toBe(201);
  })
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
    });

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
    test("[3] responds with 404 if recipe_id is not in database",async()=>{
      const res = await request(server).put("/api/1/recipes/100").set("Authorization","valid token").send({...recipe,recipe_name:"updated name"});
      expect(res.status).toBe(404)
    })
    test("[6a] responds with 400 with invalid3",async()=>{
      let res = await request(server).put("/api/1/recipes/1").set("Authorization","valid token").send(invalid3);
      expect(res.status).toBe(400);
    })
    test("[6b] responds with 400 with invalid4",async()=>{
      let res = await request(server).put("/api/1/recipes/1").set("Authorization","valid token").send(invalid4);
      expect(res.status).toBe(400);
    })
    test("[6c] responds with 400 with invalid5",async()=>{
      let res = await request(server).put("/api/1/recipes/1").set("Authorization","valid token").send(invalid5);
      if(res.status !== 400){
        expect(res.body).toBe("")
      }
      expect(res.status).toBe(400);
    })
    test("[6d] responds with 400 with invalid6",async()=>{
      let res = await request(server).put("/api/1/recipes/1").set("Authorization","valid token").send(invalid6);
      if(res.status !== 400){
        expect(res.body).toBe("")
      }
      expect(res.status).toBe(400);
    })
    test("[7a] responds with 201 with valid1",async()=>{
      let res = await request(server).put("/api/1/recipes/1").set("Authorization","valid token").send(valid1);
      expect(res.status).toBe(200);
    })
    test("[7b] responds with 201 with valid2",async()=>{
      let res = await request(server).put("/api/1/recipes/1").set("Authorization","valid token").send(valid2);
      expect(res.status).toBe(200);
    })
    test("[7c] responds with 201 with valid3",async()=>{
      let res = await request(server).put("/api/1/recipes/1").set("Authorization","valid token").send(valid3);
      if(res.status !== 200){
        expect(res.body).toBe("")
      }
      expect(res.status).toBe(200);
    })
    test("[7d] responds with 201 with valid4",async()=>{
      let res = await request(server).put("/api/1/recipes/1").set("Authorization","valid token").send(valid4);
      if(res.status !== 200){
        expect(res.body).toBe("")
      }
      expect(res.status).toBe(200);
    })
    test("[7e] responds with 201 with valid5",async()=>{
      let res = await request(server).put("/api/1/recipes/1").set("Authorization","valid token").send(valid5);
      if(res.status !== 200){
        expect(res.body).toBe("")
      }
      expect(res.status).toBe(200);
    })
  });
  
  describe("[DELETE] /api/:user_id/recipes/:recipe_id",()=>{
    test("[1] responds with 200",async()=>{
      const res = await request(server).delete("/api/1/recipes/1").set("Authorization","valid token");
      expect(await db("recipes").where({recipe_id:1})).toHaveLength(0);
    })
  });