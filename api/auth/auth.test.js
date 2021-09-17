const request = require("supertest");
const server = require("../server");

const user1 = {username:"chris",password:"123456"};
const user2 = {username:"eve",password:"654321"};

const user1hashed = {...user1,password:bcrypt.hashSync(user1.password)};
const user2hashed = {...user2,password:bcrypt.hashSync(user2.password)};

beforeAll(async()=>{
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async()=>{
  await db("users").truncate();
  await db("users").insert(user1hashed);
  await db("users").insert(user2hashed);
});
afterAll(async()=>{
  await db.destroy();
});

describe("[POST] /api/auth/register",()=>{
    test("[1] responds with 400 if invalid body",async()=>{
        const invalid_bodies = [
        {username:"",password:""},
        {username:"john",password:""},
        {username:"",password:"12334534"},
        {username:"john"},
        {password:"12334534"}
        ];
        for(let invalid of invalid_bodies){
        const res = await request(server).post("/api/auth/register").send(invalid);
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual("username and password required");
        }
    });
    test("[2] responds with 400 if username already exists",async()=>{
        const res = await request(server).post("/api/auth/register").send({username:"chris",password:"10394578"});
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual("username taken");
    });
    test("[3] user added to db and password hashed",async()=>{
        const res = await request(server).post("/api/auth/register").send({username:"nicole",password:"10394578"});
        const newUser = await db("users").where({username:"nicole"}).first();
        expect(newUser.username).toEqual("nicole");
        expect(bcrypt.compareSync("10394578",newUser.password)).toBe(true);
    });
    test("[4] responds with 201",async()=>{
        const res = await request(server).post("/api/auth/register").send({username:"nicole",password:"10394578"});
        expect(res.status).toBe(201);
    });
    test("[5] responds with correct object",async()=>{
        const res = await request(server).post("/api/auth/register").send({username:"nicole",password:"10394578"});
        expect(res.body).toHaveProperty("password");
        expect(res.body).toMatchObject({username:"nicole",id:3});
    });
});