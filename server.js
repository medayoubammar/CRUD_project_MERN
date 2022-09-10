const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require("./models/User");
const Login = require('./models/Login');

require('dotenv').config();


const app = express();
app.use(cors()); // * CREATE LOCAL SERVER AND ALLOW OUTSIDE REQS TO OUR DB USING CORS
app.use(express.json());
//* TO ACCEPT ANY JSON FILE IN OUR REQUESTS AS DATA

const url = process.env.DB_URL; //* GET DB PATH AND TRY TO CONNECT TO IT
mongoose.connect(url); // * url = notre réfernce de base de donnée 
const connection = mongoose.connection;

connection.once("open", ()=>{
    console.log("Mongo DB database connection successfully !");
})


app.listen(3002, ()=>{
    console.log('server running on port 3002');
})




//* ROUTE FOR AUTH 

app.get('/login/:login/:pwd' , async (req,res) => {
  try {
    let myLogin = req.params.login;
    let pwd = req.params.pwd;
    let currentUser = await 
    Login.findOne({login : myLogin , password : pwd});
   if(!currentUser) 
   res.send(false)
   else res.send(currentUser)
  } catch (error) {
    res.send(error);
    console.log(error);
  }
}) 



app.get('/getAllData', async(req,res) => {
    try {
        let allUsers = await User.find({});
        res.send(allUsers);
    } catch (error) {
      res.send(error);
      console.log(error);
    }
})


// * GET BY ID REQUEST 

app.get('/users/:id', async (req,res) => {
   try {
    let userId = req.params.id;
    let finalUser = await User.findOne({_id : userId});
    res.send(finalUser);
   } catch (error) {
    res.send(error);
    console.log(error);
   } 
})


app.post('/add' , async (req,res)=>{
   try {
    let data = req.body;
    let userModel = new User(data);
   let finalUser = await userModel.save();
   res.send(finalUser)
   } catch (error) {
    res.send(error);
    console.log(error);
   }

})


app.put('/update/:id' ,async(req,res)=>{
  try {
    let userId = req.params.id;
    let newData = req.body;
    await User.findByIdAndUpdate({_id : userId} , newData);
    res.send("user updtaed !");
  } catch (error) {
    res.send(error);
    console.log(error);
  }
})


app.delete('/delete/:id' , async(req,res)=>{
   try {
    let userId = req.params.id;
    await User.findOneAndDelete({_id : userId});
    res.send("user deleted !");
   } catch (error) {
    res.send(error);
    console.log(error);
   }
})

