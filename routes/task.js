const express=require('express')
const router=express.Router()

const {
    getAllTask,
    addTask,
    getSingleTask,
    modifyTask,
    deleteTask
}=require('../controller/task')


router.get('/',getAllTask)
router.post('/',addTask)
router.get('/:id',getSingleTask) 
router.patch('/:id',modifyTask)
router.delete('/:id',deleteTask)

module.exports=router