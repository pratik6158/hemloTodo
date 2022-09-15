const express = require('express')
const path = require('path')
const fs = require('fs')
const { json } = require('body-parser')

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
    var dta={
        task:req.body.data
    }
    var data=JSON.stringify(dta)
    const path="./data.json";
    if(fs.existsSync(path)){
        //file exist
        try{
            fs.appendFileSync("data.json",data)
            fs.appendFileSync("data.json",',')
            console.log("Write was sucessful")
        }catch(err){
            console.log("ERROE line 31")
        }
    }else{
        //file does not exist
        fs.writeFile('./data.json','['+data+',',err=>{
            if(err){
                console.log("There was some problem");
                return;
            }
            console.log('data saved successfully')
        })
        // fs.appendFileSync("data.json",',')
    }
    res.send("Got It")
})

run.get('/conf',(req,res)=>{

    if(fs.existsSync("./data.json")){
        fs.readFile(path.resolve(__dirname,"data.json"),"utf-8",(err,dta)=>{
            if(err){
                console.log(err)
            }
            var data=dta.substring(0,dta.length-1)
            data+=']'
            console.log(data)
            res.send(data)
        })
    }else{
        res.send("[]")
    }

    
})

run.listen(5000)