const express = require('express');
const app = express();
const PORT = 3000;
const route = require('./routes/userRoutes')
const {userAuth} = require('./model/userModel');
const { log } = require('console');

app.use(express.json())
app.use('/api',route.route)
userAuth.sync();
app.listen(PORT,()=>{console.log(PORT);})