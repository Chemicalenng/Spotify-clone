const mongoose = require("mongoose");
// how to create model
//step 1 require mongoose
//step 2 create mongoose schema
// step 3 create a model
const User = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,

    },
    lastName: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
        private: true
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    likedSongs: {
        type: String,
        default: "",
    },
    likedPlaylist: {
        type: String,
        default: "",
    }

})
const userModel = mongoose.model("User", User);
module.exports = userModel;