const mongoose = require("mongoose");

const Playlist = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    songs: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Song",

        },
    ],
    collaborators: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
    ],
})
const playlistModel = mongoose.model("Playlist", Playlist);//first input is name for data and second is name of schema made
module.exports = playlistModel;