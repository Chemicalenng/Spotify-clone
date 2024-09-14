const express = require("express");
const app = express();
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport");
const User = require("./models/User");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/Song");
const playlistRoutes = require("./routes/Playlist");
const CORS = require("cors");

app.use(CORS());
app.use(express.json());
require("dotenv").config();

//console.log(process.env);
// Connect to MongoDB database using Mongoose.

const mongoose = require("mongoose");
// connect contains 2 arguemnets: 1. which db to connect to (dbURL), 2. Connection options
mongoose.connect("mongodb+srv://kavya_04:" +
    process.env.MONGO_PASSWORD + "@cluster0.e5ijr9r.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then((x) => {
    console.log("Connection to MongoDb successful")
}).catch((err) => {
    console.log(err);
});

//setup passport-jwt

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
        //user exist or not
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

app.get("/", function (req, res) {
    res.send("Hello World");
})
app.use("/auth", authRoutes);
app.use("/Song", songRoutes);
app.use("/Playlist",playlistRoutes);

app.listen(6060, function () {
    console.log("Server is listening on port 6060");
})
