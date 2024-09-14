const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../models/song");
const User = require("../models/User");

//req.user get the user because of passport.authenticate it sends token
//session is used to keep you logged in
router.post("/create", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { name, thumbnail, track } = req.body;
    if (!name || !thumbnail || !track) {
        return res.status(400).json({ msg: "Missing fields" });
    }
    const artist = req.user._id;
    const songInfo = { name, thumbnail, track, artist };
    const createdSong = await Song.create(songInfo);
    return res.status(200).json(createdSong);
});//added middleware in it

//get route to get all songs i have published
router.get("/get/mysongs", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const currentUser = req.user;
    //we need to get all songs in which artist id === currentUser id
    const songs = await Song.find({ artist: req.user._id }).populate("artist","firstName lastName");
    
    return res.status(200).json({ data: songs });
    
});
//get route to get all songs an artist has published
router.get("/get/artist/:artistID", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { artistID } = req.params;
    const artist = await User.findOne({ _id: artistID });
    console.log(artist);
    //!null = true
    //![]=false
    //!undefined = true
    if (!artist) {
        return res.status(401).json({ msg: "No such Artist exists!" });
    }
    const songs = await Song.find({ artist: artistID });
    return res.status(200).json({ data: songs });
});
//get route to get song by giving name
router.get("/get/trackName/:trackName", async (req, res) => {
    const { trackName } = req.params;
    const song = await Song.find({ name: { "$regex": trackName, "$options": "i" } });//pattern matching instead of directly name matching
    return res.status(200).json({ data: song });
});

module.exports = router;