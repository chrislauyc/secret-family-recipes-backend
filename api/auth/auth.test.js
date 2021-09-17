const request = require("supertest");
const server = require("../server");
const db = require("../../data/data-config")
const bcrypt = require("bcryptjs");
const user1 = {username:"chris",password:"123456"};
const user2 = {username:"eve",password:"654321"};

const user1hashed = {...user1,password:bcrypt.hashSync(user1.password)};
const user2hashed = {...user2,password:bcrypt.hashSync(user2.password)};

bcrypt.hashSync = jest.fn(()=>"this is a hashed password");

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