let User = require("../model/userschema")
const bcrypt = require('bcrypt')

let loginController = async (req,res)=>{
    let {email,password} = req.body
    console.log(email,password);

    let existingUser = await User.find({email})
    console.log(existingUser)
if(existingUser.length == 0){
    res.send({error: " User not found"})
}else{
    bcrypt.compare(password, existingUser[0].password, function(err,result){
        console.log(result)
        if(result){
            res.send({error: "Login Successfully"})
        }else{
            res.send({error: " User not found"})
        }
    })
}
   
}

module.exports = loginController;