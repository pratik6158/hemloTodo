const PORT=5000
const express = require('express')
const app = express()
const tasks=require('./routes/task')
const connectDB=require('./db/connect')

app.use(express.static('./public'))
app.use(express.json())

app.use('/api/tasks',tasks)


const start=async()=>{
    try{
        await connectDB()
        app.listen(PORT,()=>{
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
