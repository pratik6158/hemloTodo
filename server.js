const PORT=5000
const express = require('express')
const app = express()
const tasks=require('./src/routes/task')
const connectDB=require('./src/db/connect')
const path=require('path')
require('dotenv').config()


app.use(express.static('./public'))
app.use(express.json())

app.use('/api/tasks',tasks)
app.get('/',(req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname,"./public/index.html"))
})
app.get('*',(req,res)=>{
    res.status(404).send("Invalid Path")
})

const start=async()=>{
    try{
        await connectDB()
        app.listen(process.env.PORT||PORT,()=>{
            console.log(`Server is at ${PORT}`)
        })
    }catch(err){
        console.log(err)
    }
}

start()
//endpoints
//Get All tasks /api/tasks/
//Create a new Task /api/tasks/
//Delete a task /api/tasks/:id
//Modify a task /api/tasks/:id
