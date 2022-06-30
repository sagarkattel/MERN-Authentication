// Importing the express module
const express=require("express");
// Initializing the express
const app=express();
const mongoose=require("mongoose");
require("dotenv").config();
const cors=require("cors");
const path = require('path')


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

// Serve static assets (build folder) if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  // get anything, load index.html file
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
// Initializing the port number
const PORT=process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log("Server is Running");
})

