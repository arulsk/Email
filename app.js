const express = require('express');
const app = express();
const PORT = 3000;
const route = require('./routes/userRoutes')
const connection = require('./config/db');


app.use(express.json())
app.use('/api',route.route)

connection().then(()=>
app.listen(PORT, err => err ?  console.log(err):console.log(PORT)));
