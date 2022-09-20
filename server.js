const express = require('express')
const path = require('path')
const fs = require('fs')
let Maindata;
let filePath=__dirname+"\\data.json"
fs.readFile(filePath,(err,data)=>{
    if(err){
        Maindata=[]
    }else{
        Maindata=data.toString("utf-8")
        Maindata=JSON.parse(Maindata)
    }
})

const app = express()
app.use(express.urlencoded());
app.use(express.json());

app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"index.html"))
    
})
app.get('/idx',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"idx.js"))
})

app.post('/todo',(req,res)=>{
    let file=req.body
    Maindata.push(file)
    let path=__dirname+"\\data.json"
    fs.writeFile(path,JSON.stringify(Maindata),err=>{
        if(err) throw err
        else{
            res.send("Done")
        }
    })
})

app.get('/conf',(req,res)=>{
    let path=__dirname+"\\data.json"
    fs.readFile(path,(err,data)=>{
        if(err){
            res.send("[]")

        }else{
            Maindata=data.toString("utf-8")
            res.send(Maindata)
            Maindata=JSON.parse(Maindata)
        }
    })
   
})

app.post('/comp',(req,res)=>{
    let idx=req.body.task
    console.log(idx)
    Maindata[idx].completed=true
    // Maindata.remove(idx)
    

    let path=__dirname+"\\data.json"
    fs.writeFile(path,JSON.stringify(Maindata),err=>{
        if(err) throw err
        else{
            res.send("Done")
        }
    })
})


app.listen(5000)