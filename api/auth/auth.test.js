const request = require("supertest");
const server = require("../server");
const db = require("../../data/data-config")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


bcrypt.hashSync = jest.fn(()=>"this is a hashed password");
bcrypt.compareSync = jest.fn((mockPassword)=>mockPassword==="correctPassword");


jwt.sign = jest.fn(()=>"signed by jsonwebtoken");


beforeAll(async()=>{

});
beforeEach(async()=>{
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
});
afterAll(async()=>{
  await db.destroy();
});

describe("[POST] /api/auth/register",()=>{
    test("[1] responds with 400 if invalid body",async()=>{
        // const invalid_bodies = [
        // {username:"",password:"",email:""},
        // {username:"sam",password:"",email:"sam@gmail.com"},
        // {username:"",password:"12334534"},
        // {username:"sam"},
        // {password:"12334534"},
        // {email:"sam@gmail.com"}
        // ];
        // for(let invalid of invalid_bodies){
        // const res = await request(server).post("/api/auth/register").send(invalid);
        // expect(res.status).toBe(400);
        // expect(res.body.message).toEqual("username and password required");

        let invalid = {username:"",password:"",email:""};
        let res = await request(server).post("/api/auth/register").send(invalid);
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual("username, password, and email required");
        
        invalid = {username:"sam",password:"",email:"sam@gmail.com"};
        res = await request(server).post("/api/auth/register").send(invalid);
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual("username, password, and email required");

        invalid = {username:"",password:"12334534"};
        res = await request(server).post("/api/auth/register").send(invalid);
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual("username, password, and email required");

        invalid = {username:"sam",password:"",email:"sam@gmail.com"};
        res = await request(server).post("/api/auth/register").send(invalid);
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual("username, password, and email required");

        invalid = {username:"sam"};
        res = await request(server).post("/api/auth/register").send(invalid);
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual("username, password, and email required");

        invalid = {password:"12334534"};
        res = await request(server).post("/api/auth/register").send(invalid);
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual("username, password, and email required");

        invalid = {email:"sam@gmail.com"};
        res = await request(server).post("/api/auth/register").send(invalid);
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual("username, password, and email required");

    });
    test("[2] responds with 400 if username already exists",async()=>{
        const res = await request(server).post("/api/auth/register").send({username:"john",password:"10394578",email:"chris@gmail.com"});
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual("username taken");
    });
    test("[3] responds with 201",async()=>{
        const res = await request(server).post("/api/auth/register").send({username:"nicole",password:"10394578",email:"nicole@gmail.com"});
        expect(res.status).toBe(201);
    });
    test("[4] user added to db and password hashed",async()=>{
        const res = await request(server).post("/api/auth/register").send({username:"nicole",password:"10394578",email:"nicole@gmail.com"});
        const newUser = await db("users").where({username:"nicole"}).first();
        expect(newUser.username).toEqual("nicole");
        expect(newUser.password).toEqual("this is a hashed password");
        expect(newUser.email).toEqual("nicole@gmail.com")
    });
    test("[5] responds with correct object",async()=>{
        const res = await request(server).post("/api/auth/register").send({username:"nicole",password:"10394578",email:"nicole@gmail.com"});

        expect(res.body).toHaveProperty("user_id");
        expect(res.body.username).toEqual("nicole");
        expect(res.body.message).toEqual("registration successful");
    });
});


describe("[POST] /api/auth/login",()=>{
    test("[1] responds with 400 if invalid body",async()=>{
        let invalid = {username:"john"};
        let res = await request(server).post("/api/auth/login").send(invalid);
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual("username and password required");
        invalid = {password:"12334534"};
        res = await request(server).post("/api/auth/login").send(invalid);
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual("username and password required");
        invalid = {username:"",password:""};
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual("username and password required");

        // invalid = {username:"chris",password:""};
        // res = await request(server).post("/api/auth/login").send(invalid);
        // expect(res.body).toEqual({})
        // expect(res.status).toBe(400);
        
        invalid = {username:"",password:"12334534"};
        res = await request(server).post("/api/auth/login").send(invalid);
        expect(res.status).toBe(400);
        
        invalid = {username:"john"};
        res = await request(server).post("/api/auth/login").send(invalid);
        expect(res.status).toBe(400);
        
        invalid = {password:"12334534"};
        res = await request(server).post("/api/auth/login").send(invalid);
        expect(res.status).toBe(400);
    });
    test("[2] responds with 401 if password is incorrect",async()=>{
        const res = await request(server).post("/api/auth/login").send({username:"john",password:"this is incorrect"});
        expect(res.status).toBe(401);
    });
    test("[3] responds with 404 if username is not found",async()=>{
        const res = await request(server).post("/api/auth/login").send({username:"notInDB",password:"correctPassword"});
        expect(res.status).toBe(404);
    });
    test("[4] responds with 200 and the created token",async()=>{
        const login = {
            user_id:1,
            username:"john",
            token:"signed by jsonwebtoken",
            message:"login successful"
        }
        const res = await request(server).post("/api/auth/login").send({username:"john",password:"correctPassword"});
        expect(res.body).toMatchObject(login);
        expect(res.status).toBe(200);
    });
});