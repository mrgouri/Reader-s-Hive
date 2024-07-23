import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import session from 'express-session';
import dotenv from "dotenv";
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

const app = express();
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true, // Allow cookies and credentials
};

app.use(cors(corsOptions));
app.use(express.json());
const port = 3000
dotenv.config();
app.use(session({
  secret: 'qwerasdfzxcv', // Replace with a strong, unique secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false,
    maxAge: 24 * 60 * 60 * 1000
   } // Set to true for https environments
}));
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