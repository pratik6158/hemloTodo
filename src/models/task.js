const mongoose=require('mongoose')

const TaskSchema=new mongoose.Schema({
    name:{
        type:String,
        require:[true,"Add a value"],
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model('taskyoyo',TaskSchema)

