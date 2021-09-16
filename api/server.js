const express = require("express");
const server = express();
const mock = require("./mock/mock");
// const router = require("path to router");
server.use(express.json());

// server.use("/api/<path>",router);

server.get("/",(req,res)=>{
    res.status(200).json({message:"Welcome to the Secret Family Recipes backend"});
});

server.use("/mock",mock);

server.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    });
});
module.exports = server;