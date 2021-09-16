const request = require("supertest");
// const db = require("../data/dbConfig");
const server = require("./server");
// const mockData = require("./jokes/jokes-data");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("./auth/secrets");



const user1 = {username:"chris",password:"123456"};
const user2 = {username:"eve",password:"654321"};

const user1hashed = {...user1,password:bcrypt.hashSync(user1.password)};
const user2hashed = {...user2,password:bcrypt.hashSync(user2.password)};
// Write your tests here
// beforeAll(async()=>{
//   await db.migrate.rollback();
//   await db.migrate.latest();
// });
// beforeEach(async()=>{
//   await db("users").truncate();
//   await db("users").insert(user1hashed);
//   await db("users").insert(user2hashed);
// });
// afterAll(async()=>{
//   await db.destroy();
// });
test('sanity check', () => {
  expect(true).toBe(true)
});
describe("mock.js",()=>{
  
  test("[POST] /mock/auth/register",async()=>{
    const res = await request(server).post("/mock/auth/register").send({});
    expect(res.status).toBe(201);
    expect(res.body.message).toEqual("registration successful");
  });
  test("[POST] /mock/auth/login",async()=>{
    const res = await request(server).post("/mock/auth/login").send({});
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual("login successful");
  });
  test("[GET] /mock/:user_id/recipes",async()=>{
    const res = await request(server).get("/mock/1/recipes");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });
  test("[GET] /mock/:user_id/recipes/recipe_id",async()=>{
    const res = await request(server).get("/mock/1/recipes/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("recipe_id");
  });
  test("[POST] /mock/:user_id/recipes",async()=>{
    const res = await request(server).post("/mock/1/recipes").send({});
    expect(res.status).toBe(201);
    expect(res.body.message).toEqual("recipe added successfully");
  });
  test("[PUT] /mock/:user_id/recipes/recipe_id",async()=>{
    const res = await request(server).put("/mock/1/recipes/1").send({});
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual("recipe updated successfully");
  });
  test("[DELETE] /mock/:user_id/recipes/recipe_id",async()=>{
    const res = await request(server).delete("/mock/1/recipes/1");
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual("recipe deleted successfully");
  });
});


describe("server.js",()=>{
  describe("[GET] /",()=>{
    test("[1] server runs without errors",async()=>{
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });
  });



  // describe("[POST] /api/auth/register",()=>{
  //   test("[1] responds with 400 if invalid body",async()=>{
  //     const invalid_bodies = [
  //       {username:"",password:""},
  //       {username:"john",password:""},
  //       {username:"",password:"12334534"},
  //       {username:"john"},
  //       {password:"12334534"}
  //     ];
  //     for(let invalid of invalid_bodies){
  //       const res = await request(server).post("/api/auth/register").send(invalid);
  //       expect(res.status).toBe(400);
  //       expect(res.body.message).toEqual("username and password required");
  //     }
  //   });
  //   test("[2] responds with 400 if username already exists",async()=>{
  //     const res = await request(server).post("/api/auth/register").send({username:"chris",password:"10394578"});
  //     expect(res.status).toBe(400);
  //     expect(res.body.message).toEqual("username taken");
  //   });
  //   test("[3] user added to db and password hashed",async()=>{
  //     const res = await request(server).post("/api/auth/register").send({username:"nicole",password:"10394578"});
  //     const newUser = await db("users").where({username:"nicole"}).first();
  //     expect(newUser.username).toEqual("nicole");
  //     expect(bcrypt.compareSync("10394578",newUser.password)).toBe(true);
  //   });
  //   test("[4] responds with 201",async()=>{
  //     const res = await request(server).post("/api/auth/register").send({username:"nicole",password:"10394578"});
  //     expect(res.status).toBe(201);
  //   });
  //   test("[5] responds with correct object",async()=>{
  //     const res = await request(server).post("/api/auth/register").send({username:"nicole",password:"10394578"});
  //     expect(res.body).toHaveProperty("password");
  //     expect(res.body).toMatchObject({username:"nicole",id:3});
  //   });
  // });
  // describe("[POST] /api/auth/login",()=>{
  //   test("[1] responds with 400 if invalid body",async()=>{
  //     let invalid = {username:"chris"};
  //     let res = await request(server).post("/api/auth/login").send(invalid);
  //     expect(res.status).toBe(400);
  //     expect(res.body.message).toEqual("username and password required");
  //     invalid = {password:"12334534"};
  //     res = await request(server).post("/api/auth/login").send(invalid);
  //     expect(res.status).toBe(400);
  //     expect(res.body.message).toEqual("username and password required");
  //     invalid = {username:"",password:""};
  //     expect(res.status).toBe(400);
  //     expect(res.body.message).toEqual("username and password required");

  //     // invalid = {username:"chris",password:""};
  //     // res = await request(server).post("/api/auth/login").send(invalid);
  //     // expect(res.body).toEqual({})
  //     // expect(res.status).toBe(400);
      
  //     invalid = {username:"",password:"12334534"};
  //     res = await request(server).post("/api/auth/login").send(invalid);
  //     expect(res.status).toBe(400);
      
  //     invalid = {username:"chris"};
  //     res = await request(server).post("/api/auth/login").send(invalid);
  //     expect(res.status).toBe(400);
      
  //     invalid = {password:"12334534"};
  //     res = await request(server).post("/api/auth/login").send(invalid);
  //     expect(res.status).toBe(400);
  //   });
  //   test("[2] responds with 401 if password is incorrect",async()=>{
  //     const res = await request(server).post("/api/auth/login").send({...user1,password:"this is incorrect"});
  //     expect(res.status).toBe(401);
  //   });
  //   test("[3] responds with 404 if username is not found",async()=>{
  //     const res = await request(server).post("/api/auth/login").send({...user1,username:"randomname"});
  //     expect(res.status).toBe(404);
  //   });
  //   test("[4] responds with 200 and the created token",async()=>{
  //     const res = await request(server).post("/api/auth/login").send(user1);
  //     expect(res.status).toBe(200);
  //     const token = res.body.token;
  //     const decoded = jwt.verify(token,secret); //will throw error if invalid
  //     expect(decoded).toHaveProperty('iat');
  //     expect(decoded).toMatchObject({username:"chris"});
  //   });
  // });
  // describe("[GET] /api/jokes",()=>{
  //   test("[1] responds with 401 if token is missing or invalid",async()=>{
  //     const res = await request(server).get("/api/jokes").set("Authorization","invalid token");
  //     expect(res.status).toBe(401);
  //   });
  //   test("[2] responds with 200 the correct number of rows",async()=>{
  //     let res = await request(server).post("/api/auth/login").send(user1);
  //     const token = res.body.token;
  //     res = await request(server).get("/api/jokes").set("Authorization",token);
  //     expect(res.status).toBe(200);
  //     expect(res.body).toHaveLength(mockData.length);
  //   });
  //   test("[3] responds with the correct format",async()=>{
  //     let res = await request(server).post("/api/auth/login").send(user1);
  //     const token = res.body.token;
  //     res = await request(server).get("/api/jokes").set("Authorization",token);
  //     expect(res.body[0]).toMatchObject(mockData[0]);
  //   });
  // });
});

