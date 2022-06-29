// Importing the express module
const express=require("express");
// Initializing the express
const app=express();
const mongoose=require("mongoose");
require("dotenv").config();
const cors=require("cors");


//Connect DB
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("Mongo is running"))
.catch((err)=>console.log(err))


app.use(cors());
// Calling the express.json() method for parsing
app.use(express.json());

app.use("/auth",require("./routes/user"));



// Initializing the port number
const PORT=process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log("Server is Running");
})