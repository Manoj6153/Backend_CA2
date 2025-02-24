const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./Routes/authRouter');

require('dotenv').config();
require('./Models/db.js');


app.use(bodyParser.json());
app.use(cors());
app.use('/auth', authRouter);


app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
}); 