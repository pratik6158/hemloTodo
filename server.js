const express = require('express')
const path = require('path')
const fs = require('fs')

const run = express()
run.use(express.urlencoded());
run.use(express.json());

run.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"index.html"))
    
})
run.get('/idx',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"idx.js"))
})

run.post('/todo',(req,res)=>{
    console.log(req.body.data)
    res.send("Got It")
})
run.listen(5000)