const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const Schema = mongoose.Schema

const lyricSchema = new mongoose.Schema({
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
        default:"no"
    },
    image: {
        type: String,
        default:"no photo"
    },
    postedBy: {
        type: ObjectId,
        ref:"User",
        required: true
    }
})

module.exports = mongoose.model('Lyric', lyricSchema)