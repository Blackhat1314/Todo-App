const { ObjectID } = require('bson');

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://127.0.0.1:27017";
const dbname = "crud_mongodb";
const mongoOptions = {useNewUrlParser : true};


const state = {
    db:null
};

const connect = (cb)=>{
    if(state.db){
        cb();
    }
    else{
        MongoClient.connect(url,mongoOptions,(err,client)=>{
            if(err){
                cb(err)
            }
            else{
                state.db = client.db(dbname)
                cb();
            }
            
        })

    }

}
const getPrimaryKey = (_id)=>{
    return ObjectID(_id);
}

const getDB = ()=>{
    return state.db;
}



module.exports = {connect,getDB,getPrimaryKey};

