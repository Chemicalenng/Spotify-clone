const express = require("express");
const router = express.Router();
const passport = require("passport");
const Playlist = require("../models/playlist");
const User = require("../models/User");
const Song = require("../models/song");

//Create a playlist
router.post("/create", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { name, thumbnail, songs, collaborators } = req.body;
    if (!name || !thumbnail || !songs) {
        return res.status(400).json({ err: "Missing fields" });
    };
    const currentUser = req.user;
    const newPlaylist = { name, thumbnail, songs, owner: currentUser._id, collaborators: [] };
    const newplaylist = await Playlist.create(newPlaylist);
    return res.status(200).json(newplaylist);

});

//get a playslist by ID in which we will return the playlist having that ID
// because of adding colon playlistId is now variable
router.get("/get/playlist/:playlistId", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const playlistId = req.params.playlistId;
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
        return res.status(404).json({ err: "No playlist found with given id." });
    }
    return res.status(200).json(playlist);
});

// get playlist made by artist
router.get("/get/artist/:artistId", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const artistId = req.params.artistId;
    //check if user exists or not
    const artist = await User.findOne({ _id: artistId });
    if (!artist) {
        return res.status(400).json({ err: 'Invalid artist Id' });
    }
    const playlists = await Playlist.find({ owner: artistId });
    return res.status(200).json({ data: playlists });
});

//add songs in playlist
router.post("/add/song", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const currentUser = req.user;
    const { songId, playlistId } = req.body;
    //find the playlist
    const playlist = await Playlist.findOne({ _id: playlistId });
    if (!playlist) {
        return res.status(400).json({ err: "Playlist does not exist!" });
    }
    // console.log(playlist);
    // console.log(currentUser);
    // console.log(playlist.owner);
    // console.log(currentUser._id);
    // console.log(typeof playlist.owner);
    //objects cant be directly compared with equal to 
    // console.log(playlist.owner.equals(currentUser._id));
    if (!playlist.owner.equals(currentUser._id) && !playlist.collaborators.includes(currentUser._id)) {
        return res.status(401).json({ err: "Unauthorized! You are not authorised to add song to this playlist" });
    }
    const song = await Song.findOne({ _id: songId });
    if (!song) {
        return res.status(400).json({ err: "Song does not exist!" })
    }
    playlist.songs.push(songId);
    await playlist.save();
    return res.status(201).json(playlist);
})


module.exports = router;
