require("dotenv").config();
const connectDB = require("./db/connect");
const productModel = require("./model/productSchema");

const productJSON = require("./product.json");


const start = async () => {
    try {
        await connectDB(process.env.MONGO_DB);
        await productModel.deleteMany();
        await productModel.create(productJSON);
        console.log("sucess");
    } catch (error) {
        console.log(error);
    }
}


start();