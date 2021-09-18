const express = require("express");
const server = express();
const mock = require("./mock/mock");
const cors = require("cors")
const authRouter = require("./auth/auth-router");
const helmet = require("helmet");
// const router = require("path to router");
server.use(express.json());

// server.use("/api/<path>",router);
server.use(helmet());
server.use(cors());

server.get("/",(req,res)=>{
    res.status(200).json({message:"Welcome to the Secret Family Recipes backend"});
});

server.use("/mock",mock);

server.use("/api/auth",authRouter);

server.get("/recipes/categories",(req,res,next)=>{
    try{
        res.status(200).json(["breakfast","lunch","dinner","desert","snacks"]);
    }
    catch(e){
        next(e);
    }
})

server.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    });
});
module.exports = server;