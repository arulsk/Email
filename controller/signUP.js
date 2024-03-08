const email = require('../model/userModel');
const bcyrpt = require('bcrypt');
const  cron = require('node-cron')
const moment = require('moment') 
const {signUPMail,thanksEmail} = require('../services/mailservice')
const signUp =  async (req, res) => {

    try {
        const { userName, userEmail, userPassword, role } = req.body;

        if (!userName || !userEmail || !userPassword || !role) {
            return res.status(500).json({
                Error: "user not entered userName or userEmail or userPassword or role "
            });
        }

        const hashPassword = await bcyrpt.hash(userPassword, 10);

        const user = await email.create({userName, userEmail, userPassword : hashPassword, role});
       await signUPMail(user)

       
     const shTime = moment();
     shTime.add(1,'minute') 
     const cronExpre = `${shTime.minute()}} ${shTime.hour()} * * * `;

      const job = cron.schedule(cronExpre,async() => {
        thanksEmail(user)
        job.stop()
    })

        console.log('Sign-up successful! Email sent.');
        res.status(201).json({ message: "Sign-up successful", user });

    } catch (error) {
        console.error("Error during signup:", error);

        if (error.name === "SequelizeValidationError") {
            const validationErrors = error.errors.map((e) => e.message);
            return res.status(400).json({ error: validationErrors });
        } else if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({ error: "User with this email already exists." });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {signUp} 