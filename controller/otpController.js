let User = require("../model/userschema")

let optController = async (req,res)=>{
    let {email,otp} = req.body
    let data = await User.find({email:email})

    if(data[0].otp == otp){
        await User.findOneAndUpdate({email:email},{otp:"",verify:true})
        res.send("verify Confirm")
    }else{
        res.send("Otp is not match")
    }
}

module.exports = optController;