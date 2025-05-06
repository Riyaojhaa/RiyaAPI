require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");

const PORT = process.env.PORT || 5000;

const product_routes = require("./routes/products");

//get the home page
// app.get("/", (req, res) => {
//     res.send("hello i m live");
// });

app.use("/api/products", product_routes);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_DB);
        app.listen(PORT, () => {
            console.log(`${PORT} yes i m connected`)
        })
    } catch (error) {
        console.log(error);      
    }
}


start();



