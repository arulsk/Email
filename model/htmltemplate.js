const Mongoose = require('mongoose')

const htmltTempalte = new Mongoose.Schema({
    tempalteType : {
        type : String,
        required : true
    },
    subject : {
        type : String,
        required : true
    },
    template : {
        type : String,
        require : true
    }
})

const temp = Mongoose.model('htmlTemplate',htmltTempalte)

module.exports = {temp}