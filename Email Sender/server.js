const express = require('express')
const app = express()
require('dotenv').config()
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view-engine','ejs')


app.get('',async(req,res)=>{
    res.render('index.ejs')
})

app.post('/send',async (req ,res)=>{
    const email = req.body.email
    const subject = req.body.subject
    const text = req.body.text
    sendEmail(email,subject,text)
    res.redirect('/')
})


// Email sending function
const sendEmail = (email,subject,text) =>{

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return console.log('Error occurs');
        }
        return console.log('Email sent!!!');
    });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));

