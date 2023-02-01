const express = require('express')
const router = require('./routes/router')
const db = require('./DB/db')

const app=express();

app.use(router)

db.connect((err)=>{
    if(err){
        console.log("Unable To connect")
        process.exit(1)
    }
    else{
        app.listen(3000);
        console.log("DB connected and listning on port 3000")

    }
})

