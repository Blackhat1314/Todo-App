const path = require('path')
const express = require('express')
const router = express.Router();
const db = require('../DB/db')
const collection = 'todo';

router.use(express.json());


router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../','./views','index.html'))
})

// read
router.get('/getTodos',(req,res)=>{
    db.getDB().collection(collection).find({}).toArray((err,documents)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(documents);
        }
    })
})



// update
router.put('/:id',(req,res)=>{
    const todoID = req.params.id;
    const userInput = req.body;

    db.getDB().collection(collection).findOneAndUpdate({_id:db.getPrimaryKey(todoID)},{$set: {todo : userInput.todo}},{returnOriginal : false},(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(result);
        }
    })
})

// new post
router.post('/',(req,res)=>{
    const userInput = req.body;
    db.getDB().collection(collection).insertOne(userInput,(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json({result: result, document :result[0]})
        }
    })


})



// delete
router.delete('/:id',(req,res)=>{
    const todoID = req.params.id;
    
    db.getDB().collection(collection).findOneAndDelete({_id : db.getPrimaryKey (todoID)},(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(result)
        }
    })
    
})







router.patch('/',(req,res)=>{
    res.send("Patch Sucessfully")
})



module.exports = router;