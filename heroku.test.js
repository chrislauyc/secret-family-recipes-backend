const axios = require("axios");

const baseURL = "https://family-recipes-app.herokuapp.com"

describe("deployed endpoints",()=>{
    describe("/api/auth/register",()=>{
        test("responds with 400 if username already exists",async()=>{
            try{
                const res = await axios.post(baseURL+"/api/auth/register",
                {
                    username:"rick",
                    password:"123456789",
                    email:"rick@gmail.com"
                })
                expect(res.status).toBe(400);
            }
            catch(e){
                expect(e.response.status).toBe(400);
            }
        })
    });
    describe("/api/auth/login",()=>{
        test("responds with 404 if user is not found",async()=>{
            try{
                const res = await axios.post(baseURL+"/api/auth/login",
                {
                    username:"thispersonshouldnotbefound",
                    password:"123456789"
                })
                expect(res.status).toBe(404);
            }
            catch(e){
                expect(e.response.status).toBe(404);
            }
        })
        test("responds with token",async()=>{
            try{
                const res = await axios.post(baseURL+"/api/auth/login",
                {
                    username:"rick",
                    password:"123456789"
                })
                expect(res.data).toHaveProperty("token");
            }
            catch(e){
                expect(res.response.data).toHaveProperty("token");
            }
        })
    });
    describe("/api/:user_id/recipes",()=>{
        test("responds with array of recipe",async()=>{
            let res = await axios.post(baseURL+"/api/auth/login",
            {
                username:"rick",
                password:"123456789"
            });
            const token = res.data.token;
            
        })
    });
});