const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenVerify = require("../middleware/tokenVerify");


router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  //Checking all fields
  if (!email || !username || !password) {
    return res.status(400).json({ msg: "Not all fields have been entered" });
  }

  //Checking Password length
  if (password.length < 6)
    return res.status(400).json({
      success: false,
      msg: "Password must be atleast 6 characters long",
    });

  // Checking if the same username exists
  const usernameExists = await User.findOne({ username: username });
  if (usernameExists)
    return res.status(400).json({
      success: false,
      msg: "Username already exists"
    });

  // Checking if the same email exists
  const emailExists = await User.findOne({ email: email });
  if (emailExists)
    return res.status(400).json({
      success: false,
      msg: "Email already exists"
    });

  // Hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Creating a new user
  const user = new User({
    username: username,
    email: email,
    password: hashedPassword,
  });

  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

  try {
    const savedUser = await user.save();
    res.status(200).json({
      success: true,
      msg: "Account has been created successfully.",
      token: token,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: "User register failed",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Checking all fields
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, msg: "Not all fields have been entered" });

  // Checking if the email exists
  const user = await User.findOne({ email: email }).populate("watchlist");
  if (!user)
    return res.status(400).json({ success: false, msg: "Invalid credentials" });

  // Checking if password is correct
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).json({ success: false, msg: "Invalid credentials" });

  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

  try {
    res.status(200).json({
      success: true,
      msg: "Login successfull",
      token: token,
      user: user
    });
  } catch (ex) {
    res.status(400).json({
      success: false,
      msg: "User login failed",
    });
  }
});


router.get('',tokenVerify,async(req,res)=>{
    const userId = req.user._id
    
    try{
        const user = await User.findById(userId)
        res.status(200).json({
            data:user
        })
    }
    catch(err){
        res.status(400).json({
            msg:err
        })
    }
    
})


module.exports = router