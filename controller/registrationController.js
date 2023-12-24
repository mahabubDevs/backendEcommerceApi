// const express = require("express");

// const emailValidation = require("../helpers/emailValidation")
// const passwordValidation = require("../helpers/passwordValidation")
const User = require("../model/userschema")
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator')



let registrationController =async (req,res)=>{
    let {name,email,password}=req.body
     let existingUser =await User.find({email:email})

     if(existingUser.length == 0){
        if(!name){
            res.send("Name is not Required");
        }else if (!email){
            // let pattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
            res.send("Email is not Required");
        }
        else if (!password){
            // let pattern = "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
            res.send("Password is not Required");
        }else{
            //  >>>>>>>>   Email and Password Validaton Code
    
            // if(email){
            //     if(!emailValidation(email)){
            //         return res.send("Valid Email Required")
            //     }
            // }
            // if(password){
            //     if(!emailValidation(password)){
            //         return res.send("Valid password Required")
            //     }
            // }
                let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
                    
                bcrypt.hash(password, 10, async function(err, hash) {
                    let user = new User({
                        name: name,
                        email:email,
                        password:hash,
                        otp: otp,
                    })
                    user.save()

                  
                    const transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                          user: "mdmahabubrahman800@gmail.com",
                          pass: "stow qtbp guon yrjj",
                        },
                      });

                      const info = await transporter.sendMail({
                        from: process.env.BASE_EMAIL, // sender address
                        to: email , // list of receivers
                        subject: "Verify Your Email", // Subject line
                        html: `<div>Please is a verify your website and click the link OTP ${otp} <a href=#>Verify</a></div>`, // html body
                      });
                    res.send(user)
                });
            
    
           
    
            
    
    
            
        } 
     }else {
        res.send("Alrady Email Existing")
    }
    

}
module.exports = registrationController;