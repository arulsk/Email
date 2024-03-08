const mongoose = require('mongoose');

const email= new mongoose.Schema({
  userName : {
        type : String,
        
    },
    userEmail:{
        type : String,
        
    },
    userPassword : {
        type : String,
        
    },
    role : {
        type : String,
     
    }
})

const model = mongoose.model("email",email)

module.exports = model
