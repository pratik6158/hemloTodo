const mongoose=require('mongoose')
MONGO_URI='mongodb+srv://amnshrma3411:ifwikmk1.@nodeexpresstodoapp.ybzeedd.mongodb.net/TODOAPP?retryWrites=true&w=majority'

const connectDB=()=>{
    return mongoose.connect(MONGO_URI)
}

module.exports=connectDB