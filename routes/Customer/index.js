const express = require('express')
const Route = express.Router();


Route.get("/",(req,res)=>{
    res.send("Customer enpoint working fine")
})

module.exports = Route;
