const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {requireLogin}=require("../middleware/auth");



//Register User
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "User already exist" });
        }
        const hashed_password = await bcrypt.hash(password, 10);
        user = new User({
            name,
            email,
            password: hashed_password,
        });
        await user.save();
        return res.status(201).json({ message: "User Created Successfully" });
    } catch (err) {
        console.log(err.message);
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    const {email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid Crediantls" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid Crediantls" });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h"});
        return res.json({ token });
    } catch (err) {
        console.log(err.message);
    }
});


router.get("/",requireLogin,async(req,res)=>{
    console.log(req.user);
    try{
        const user=await User.findById(req.user._id).select('-password');
        res.json(user);
    } catch(err){
        console.log(err);
    }
})

module.exports = router;