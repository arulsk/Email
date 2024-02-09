const userAuth = require('../model/userModel');
const bcyrpt = require('bcrypt');
const nodeMailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, '../htmlTem/template.html');
const template = fs.readFileSync(templatePath, 'utf8');

const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: "arulk1535@gmail.com",
        pass: "npgclcbzppylwriw"
    },tls:{
        rejectUnauthorized : false
    }
});

const signUp = async (req, res) => {
    try {
        const { userName, userEmail, userPassword, role } = req.body;

        if (!userName || !userEmail || !userPassword || !role) {
            return res.status(500).json({
                Error: "user not entered userName or userEmail or userPassword or role "
            });
        }

        const hashPassword = await bcyrpt.hash(userPassword, 10);

        const user = await userAuth.createUser(userName, userEmail, hashPassword, role);

        await transporter.sendMail({
            from: "arulk1535@gmail.com",
            to: userEmail,
            subject: 'Welcome to Tech Savvy',
            html: template.replace('{{username}}', userName)
        });

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