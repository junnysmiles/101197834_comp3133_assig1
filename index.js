const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const url = "mongodb+srv://junnysmiles:junny1234@fullstack.xy5fk.mongodb.net/101197834_comp3133_assig1?retryWrites=true&w=majority"

//Connect to mongoDB Atlas
const connect = mongoose.connect(url, 
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
})

connect.then(success => {
    console.log('Mongodb connection successful!')
}).catch(err => {
    console.log('MongoDB Connection ERROR...' + err)
})

const app = express();
app.use('*', cors());
app.listen(3000, () => { console.log('Server is running...') })