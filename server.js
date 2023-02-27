const express = require('express');
const cors = require('cors');
const {MongoClient} = require('mongodb');

const app = express();
app.use(cors())
app.use(express.json())

const url ="mongodb+srv://admin:admin@cluster0.ljqdywz.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const db = client.db('db1');
const col = db.collection('col1');

app.post('/',(req,res)=>{
    console.log(req.body);
    col.insertOne(req.body);
    res.send("Insert Successfully");
})

app.get('/products',async(req,res)=>{
     const result = await col.find().toArray();
     console.log(result);
    res.send(result);
})

app.delete('/delete/:id',async(req,res)=>{
    const ID = req.params.id;
    const result = await col.deleteOne({id : ID});
    console.log(result);
   res.send(result);
})
// app.get('/',(request,response)=>{
//     console.log("This is Get Request")
// })



app.listen(1420);
console.log("Server Started")