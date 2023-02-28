const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Lyric = require('../models/lyricmodel')
const requireAuth = require('../middleware/Auth')   

router.get('/alllyric',(req,res)=>{
    Lyric.find()
    .populate("postedBy","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/createlyric',requireAuth,(req,res)=>{
    const {SongName,Artist,lyrics,aboutLyrics,image} = req.body
    if(!SongName || !Artist || !lyrics){
        res.status(422).json({error:"please add all the fields"})
    }
    req.user.password = undefined
    const post = new Lyric({
        SongName,
        Artist,
        lyrics,
        aboutLyrics,
        image,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/mylyric',requireAuth,(req,res)=>{
    Lyric.find({postedBy:req.user.id})
    .populate("postedBy", "_id name")
    .then(mylyric=>{
        res.json({mylyric})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router