require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/books');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.set('strictQuery', false);
const connectDb = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

}


app.get('/',(req,res)=>{
    res.send({title: 'Books'});
});

app.get('/add-note',async (req,res)=>{
   try {
    await Book.insertMany([
{
    title: "Harry Potter",
    body: "rand watever stuff ...",
},
{
    title: "Fortnite the guide to sweating",
    body: "rand watever stuff ...",
},
    res.send("Data added")
    ])
   } catch (error) {
    console.log("err", +error);
   }
});

app.get('/books', async (req,res)=> {
    const book = await Book.find();

    if (book) {
        res.json(book)
    } else{
        res.send("An error occured.😒😒")
    }
})

connectDb().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Listening on port ${PORT}`);
    })
});