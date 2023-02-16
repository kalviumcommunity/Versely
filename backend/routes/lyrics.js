
const express = require('express')
const Lyric = require('../models/lyricmodel')

const router = express.Router()

//get all lyrics
router.get('/',(req, res) => {
    res.json({mssg: "Get all lyrics"})
})

//get a single lyrics
router.get('/:id',(req, res) => {
    res.json({mssg: "Get a single workout"})
})

//post a lyric
router.post('/', async(req, res) => {
    const {SongName, Artist, lyrics, aboutLyrics, image } = req.body

    try{    
        const lyric = await Lyric.create({SongName, Artist, lyrics, aboutLyrics, image})
        res.status(200).json(lyric)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
})

//delete a lyric
router.delete('/', (req, res) => {
    res.json({mssg: "delete a lyric"})
})

//update a lyric
router.patch('/', (req, res) => {
    res.json({mssg: "update a lyric"})
})

module.exports = router