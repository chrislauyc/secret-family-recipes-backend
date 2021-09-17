const request = require("supertest");
const server = require("../server");

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