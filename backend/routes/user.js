const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = require('../models/userModel')

// router.get('/', (req, res) => {
//     res.send('hello')
// })

router.post('/signup', (req,res) => {
    const {name,email,password} = req.body
    if(!email || !password || !name){
        return res.status(422).json({error:"please add all the fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exist with this email"})
        }
        bcrypt.hash(password, 12)
        .then(hashedpassword => {
            const user = new User({
                email,
                password:hashedpassword,
                name
            })
    
            user.save()
            .then(user=>{
                res.json({message:"Saved successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
        
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/signin',(req, res) => {
    const {email,password} = req.body
    if(!email || !password){
        res.status(422).json({error:"please provide email and password"})
    } 
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            res.status(422).json({error: "Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password,(err, result)=>{
            if(err){
                return err.status(401).json({message:"Authentication failed", error:err})
            }
            if(result){
                return res.status(200).json({message:"Authentication Successfull"})
            }
        })
        // .then(doMatch=>{
        //     if(doMatch){
        //         res.json({message:"Successfully signin"})
        //     }
        //     else{
        //         return res.status(422).json({error:"2invalid Email or password"})
        //     }
        // })
        // .catch(err=>{
        //     console.log(err)
        // })
    })
})

module.exports = router
