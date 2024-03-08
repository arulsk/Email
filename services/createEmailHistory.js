const mail = require('../model/mailHistory')
 


module.exports = { createHistory : async(email)=>{
   try{ 
     await mail.create(email) 
    console.log('email history inserted sucessfully');
   }catch(err){
    console.log(err);
   }
}
}