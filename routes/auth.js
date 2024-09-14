const express = require("express");
const router = express.Router();//we require only get and post like methods
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helpers")

//POST route will help to register the user
router.post("/register", async (req, res) => {
    //it will run when /register api is called as a POST request
    const { email, password, firstName, lastName, username } = req.body;//get data from client side
    //check whether user with particular email exist or not
    const user = await User.findOne({ email: email });
    if (user) {
        return res.status(406).json({ error: "An user with this email already exists" });
    }
    //Create a new user in the DB
    const hashPassword = await bcrypt.hash(password, 10);//we do not store passwords in plain text
    //passwords are converted to hash on basis of certain parameters if one is changed then hash gets changed
    //we cannot convert hash back to password
    const newUser = {
        email, password: hashPassword, firstName, lastName, username
    };
    const newuser = await User.create(newUser);
    //we want to create token which will be particular for every user so that backend gets to know which user is sending request
    const token = await getToken(email, newuser);
    const userReturn = { ...newuser.toJSON(), token };
    delete userReturn.password;
    return res.status(200).json(userReturn);
});
router.post("/login", async (req, res) => {
    //step 1 get email and password of the user
    const { email, password } = req.body;
    //step 2 check if user exist or not. If not then it is ivalid.
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(401).json({ error: "Invalid Email or Password" })
    }
    //step 3 check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ error: "Invalid Email or Password" });
    }
    //step 4 if credentials are valid then return a token to user
    const token = await getToken(user.email, user);
    const userReturn = { ...user.toJSON(), token };
    delete userReturn.password;
    return res.status(200).json(userReturn);
});

module.exports = router;