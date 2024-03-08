const fs = require('fs');
const{temp} = require('./model/htmltemplate')
const mongoose = require('mongoose');

function htmlToString(filePath) {
    try {
        const htmlContent = fs.readFileSync(filePath, 'utf8');
        return htmlContent;
    } catch (err) {
        console.error('Error reading HTML file:', err);
    }
}

const htmlFilePath = './htmlTem/template.html';
const htmlFilePathTwo = './htmlTem/temp2.html'
const verfied = htmlToString(htmlFilePath);
const Thanks = htmlToString(htmlFilePathTwo)
const insertDb = async()=>{
 await temp.insertMany([{
    tempalteType : 'SIGN-IN',
    subject :'Email Verfied message',
    template : verfied   
},{
    tempalteType : 'WELCOME',
    subject :'thanks message',
    template : Thanks
}])
console.log('template loaded');
}


const main = async () => {
    try {
        await mongoose.connect('mongodb://localhost/email', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB database');
        await insertDb(); 
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};
main()