import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000
dotenv.config();
const MongodbUri ="mongodb://localhost:27017/books";
// connect db
try{
    mongoose.connect(MongodbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("connected to db");
}catch(error){
console.log(error);
}
// routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})