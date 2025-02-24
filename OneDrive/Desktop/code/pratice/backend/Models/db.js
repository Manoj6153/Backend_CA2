const mongoose = require('mongoose')

const mongo_url = process.env.MONGO_URI;

mongoose.connect(mongo_url)
   .then(()=>{
    console.log('Connected to Server');
   }).catch((err)=>{
    console.log('Server Connection Error', err);
   })