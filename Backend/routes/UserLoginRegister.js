const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user_model')
require('dotenv').config();

const router = express.Router();


const getUser = async (email,password) => {
    const result = await User.find({"email":email , "password":password})
    // console.log("result",result)
    // console.log(result[0].name)
    return result;
}

const createUser = async (name , email,password) => {
    const testUser = new User({
        name : name,
        email : email,
        password : password,
    })
    try{
        const res = await testUser.save()
        return res;
    }
    catch (err) {
        console.error(err)
        return null;
    }
    
}

router.post('/login',async (req, res)=>{
    // console.log(req.query);
    console.log("body 1" , req.body);
    const val = await getUser(req.body.email , req.body.password)
    console.log(val.length,"number of user in login")
    if(val)
    res.send(val[0]._id)
    else
    res.send("")
})

router.post('/register',async(req, res)=>{
    try{
    console.log(req.body)
    if(req.body.name == "" || req.body.email == "" || req.body.password == "" || req.body.name == undefined || req.body.email == undefined || req.body.password == undefined){
        res.status(400).send("bad request")
        return
    }
    const user = await User.find({"email":req.body.email});
    console.log(user.length,"user")
    if(user.length > 0){
        console.log("user already exists")
        res.send("user already exists")
        return
    }


    const userNow = await createUser(req.body.name ,req.body.email , req.body.password)
    if(userNow){
    console.log(userNow._id)
    res.send(userNow._id)
    } 
    else{
        res.status(204).send("no user found")
    }}
    catch(err){
        console.error(err)
        res.status(500).send("internal error")
    }
})

module.exports = router