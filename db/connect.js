const mongoose = require("mongoose");

//const uri = ;


const connectDB = (uri) => {
    console.log("connection with database");
    return mongoose.connect(uri);
}

module.exports = connectDB;