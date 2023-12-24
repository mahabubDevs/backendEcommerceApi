const express = require("express");
const _ = express.Router();
const registrationController = require("../../controller/registrationController")
const otpverifyController = require("../../controller/otpController")
const loginController = require("../../controller/loginController")

_.post("/registration",registrationController)
_.post("/otpverify",otpverifyController)
_.post("/login",loginController)


module.exports = _;