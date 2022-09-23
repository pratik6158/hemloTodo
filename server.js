const express = require('express')
const path = require('path')
const fs = require('fs');
let Maindata=[];
let filePath=__dirname+"\\data.json"
const folderName="tasks"
const folderPath=path.resolve(__dirname,folderName)
if(!fs.existsSync(folderPath)){
    fs.mkdirSync(folderName)
}

const app = express()
app.use(express.urlencoded());
app.use(express.json());

app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"index.html"))
    
})
app.get('/idx',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"idx.js"))
})

//add the todo
app.post('/todo',(req,res)=>{
    let file=req.body
    // console.log(file)
    fs.writeFile("./tasks/"+file.task,JSON.stringify(file),(err)=>{
        if(err) throw err
        else{
            Maindata.push(file)
            console.log(Maindata)
            res.send("Noted The task -> "+file.task)
      
        }
    })
})

app.get('/conf',(req,res)=>{
    let taskList=fs.readdirSync(folderPath,{encoding:"utf-8"},(err)=>{
        if(err) throw err
    })
    const temp = taskList.map((val)=>JSON.parse(fs.readFileSync("tasks/"+val,{encoding:"utf-8"})))
    Maindata=temp
    res.send(Maindata)
})

//to delete the task
app.post('/del',(req,res)=>{
    let idx=req.body.id;
    console.log(idx)
    for (let i = 0; (i < Maindata.length); i++) {
        if(Maindata[i].id==idx){
            fs.unlink(path.resolve(folderPath,Maindata[i].task),err=>{
                if(err){
                    throw err
                } 
                else{
                    Maindata.splice(i,1)
                    res.send("Removed the file Sucessfully") 
                }
            })
        }
    }
})

app.listen(5000)