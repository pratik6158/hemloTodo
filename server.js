const express = require('express')
const path = require('path')
const fs = require('fs')
const { json } = require('body-parser')

const folderPath=path.join(__dirname,'Tasks')

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
    var data=req.body.data
    if(fs.existsSync(folderPath)){
        fs.writeFile(folderPath+"/"+data,"",(err)=>{
            if(err)throw err
            else console.log("Got The task")
        })
    }else{
        fs.mkdirSync("./Tasks")
    }
    res.send("Got It")
})

run.get('/conf',(req,res)=>{
    if(!fs.existsSync(folderPath)){
        fs.mkdirSync("./Tasks")
        res.send("[]")
    }
    else{
        fs.readdir(folderPath,{encoding:'utf-8'},(err,files)=>{
            if(err)throw err
            else{
                files.forEach(i => {
                    console.log(i)
                });
                res.send(files)
            }
        })
    }
})

run.listen(5000)