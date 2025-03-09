const express = require('express')
const app = express()
const nodemailer = require('nodemailer');
const router = express.Router()
const cors = require('cors')



// Create a transporter object
let transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
user: 'beridzegigi19@gmail.com',
pass: 'nkrf ouno rhkx uukc'
}
});

app.use(cors({
    origin:'*'
}))



// Define the email options

app.use(express.json())

// Send the email
router.post('/sendmessage' , (req,res) => {

    const {fullname , phone , email , message} = req.body


    if(!fullname || !phone || !email || !message ){
        res.status(404).send("Dont Try To Hack Us :))))")
    }else{
        console.log("Sending")

        const sendtext = `
        Fullname:${fullname}
        Phone:${phone}
        Email:${email}
        Message:${message}
        `

        let mailOptions = {
            from: 'Message From Portfolio',
            to: 'beridzegigi19@gmail.com',
            subject: fullname,
            text: sendtext,
            };
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
            console.log(error);
            } else {
                console.log("Sended Succesfuly")
            res.status(200).send("Email Send Succesfully")
            }
            });
    }

   
        
})

app.use('/' , router)



app.listen(4000 , console.log("Server Hosted"))
