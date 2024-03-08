const nodeMailer = require('nodemailer');
require('dotenv').config();
const{findtemp} = require('./FindTemplate')
const {createHistory} = require('./createEmailHistory')
const transporter = nodeMailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
   tls:{
    rejectUnauthorized : false
   }
});
const sendEmail = async({templateType,...option})=>{ 

    const mailOption =  {
    from:process.env.EMAIL_USER ,
    ...option
    }

    await transporter.sendMail(mailOption, function (err, info) {
        if (err) {
          console.log("mail sending error : ",err); 
          return 
        }})
      
const hisdata = {
    ...mailOption,
    templateType
}
await createHistory(hisdata)
}
const signUPMail = async(data)=>{
    const tempalteType = 'SIGN-IN'
    const emailDetials = await findtemp(tempalteType)
    const strHtml = await repalce(emailDetials.template,data)
    const mailOption= {
        to:data.userEmail,
        subject : emailDetials.subject,
        html : strHtml
    }
    await sendEmail(mailOption); 

}

const thanksEmail = async(data)=>{
    const tempalteType = 'WELCOME'
    const emailDetials = await findtemp(tempalteType)
    const strHtml = await repalce(emailDetials.template,data)
    const mailOption= {
        to:data.userEmail,
        subject : emailDetials.subject,
        html : strHtml
    }
    await sendEmail(mailOption); 

}



const repalce = (template,rep)=>{
    try{
   template = template.replace('{{username}}', rep?.userName ?? '');
    console.log(rep.userName);
    return template
    }catch(err){
        console.log(err);
    }
}
module.exports = {signUPMail,thanksEmail}