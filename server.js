const express = require('express')
const path = require('path')
const fs = require('fs')
const { mainModule } = require('process')
var Maindata=[]
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
    var file=req.body
    Maindata.push(file)
    console.log(Maindata)
    var path=__dirname+"\\data.json"
    fs.writeFile(path,JSON.stringify(Maindata),err=>{
        if(err) throw err
        else{
            res.send("Done")
        }
    })
})

run.get('/conf',(req,res)=>{
    var path=__dirname+"\\data.json"
    fs.readFile(path,(err,data)=>{
        if(err){
            res.send("[]")
            // throw err

        }else{
            Maindata=data.toString("utf-8")
            res.send(Maindata)
            Maindata=JSON.parse(Maindata)
        }
    })
   
})

run.listen(5000)