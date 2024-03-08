const Mongoose = require('mongoose')

const mailShema = new Mongoose.Schema({
      from: { type: String },
      to: { type: String },
      subject: { type: String },
      html: { type: String },
}) 

const mail = Mongoose.model('emailhistory',mailShema)

module.exports = mail