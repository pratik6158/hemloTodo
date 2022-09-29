const Task=require('../models/task')

const getAllTask= async (req,res)=>{
    try{
        const tasks=await Task.find({}) 
        res.status(200).json({tasks:tasks})
    }catch(err){
        res.status(500).json({msg:err})
    }
}

const addTask= async(req,res)=>{
    try{
        const task=await Task.create(req.body)
        res.status(201).json({task})
    }catch(err){
        res.status(500).send({msg:err})
    }
}

const getSingleTask= async(req,res)=>{
    try{
        const {id:taskID}=req.params
        const task=await Task.findOne({_id:taskID})
        if(!task){
            return res.status(404).json({msg:`No task with id ${taskID}`})
        }
        res.status(200).json(task)
    }catch(err){
        res.status(500).json({err})
    }
}

const deleteTask=async(req,res)=>{
    try{
        const {id:taskID}=req.params
        const task=await Task.findOneAndDelete({_id:taskID})
        if(!task){    
            return res.status(404).json({msg:`No task with id ${taskID}`})
        }
        res.status(200).json({task})
    }catch(err){
        res.status(500).json({msg:err})
    }
}

const modifyTask=async(req,res)=>{
    try{
        const {id:taskID}=req.params
        const task=await Task.findOneAndUpdate({_id:taskID},req.body,{
            new:true,
            runValidators:true
        })
        if(!task){
            return res.status(404).json({msg:`No task with id ${taskID}`})    
        }
        res.status(200).json({msg:task})
    }catch(err){
        res.status(500).json({err})
    }
}


module.exports={
    getAllTask,
    addTask,
    getSingleTask,
    modifyTask,
    deleteTask
}