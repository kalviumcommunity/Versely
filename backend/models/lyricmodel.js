const mongoose = require('mongoose')

const Schema = mongoose.Schema

const lyricSchema = new Schema({
    SongName: {
        type: String,
        required: true
    },
    Artist: {
        type: String,
        required: true
    },
    lyrics: {
        type: String,
        required: true
    },
    aboutLyrics: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    }
},{timestamps: true})

module.exports = mongoose.model('Lyric', lyricSchema)