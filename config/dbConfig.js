const mongoose = require("mongoose");
let {USER_NAME,PASSWORD,DATABASE} = process.env


function dbConnection(){
    mongoose.connect(`mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0.wwnw5qa.mongodb.net/${DATABASE}?retryWrites=true&w=majority`)
    .then(() => console.log('Connected!'));
}

module.exports = dbConnection;
