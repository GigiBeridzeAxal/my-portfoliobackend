const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
app.use(express.json())
const nodemailer = require('nodemailer');
const router = express.Router()
const cors = require('cors')
const bcrypt = require('bcrypt')


app.use(cors({
    origin:'*'
}))

const loggermiddleware = async(req,res,next) => {



    const {hashed} = req.body
    if (!hashed) {
        console.log("Hashed is undefined, returning error");
        return res.status(400).json({ error: "Missing hashed value" });
    }




   const matched = await bcrypt.compare(process.env.SECRET , hashed)
   if(matched){
    next()
   
   }else{
    res.status(400).json({ error: "Missing hashed value" });
   }


   

    





}

app.use(loggermiddleware)


// Create a transporter object
let transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
user: 'beridzegigi19@gmail.com',
pass: 'nkrf ouno rhkx uukc'
}
});





// Define the email options



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
