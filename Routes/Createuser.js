const express = require('express');
const router = express.Router();
const User = require('../models/user');
  // used express validator package to validate
const {body ,validationResult } = require('express-validator')
router.post("/createuser",[body('name').isLength({min:5}),body('email').isEmail(),body('password','incorrect password').isLength({min:5})],async(req,resp)=>{ 

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return resp.status(400).json({errors:errors.array()});
    }
    try{
        await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
            
        })
        resp.json({success:true});
    }
    catch(error){
        console.log(error);
        resp.json({success:false});
    }
}) 

//login ke liye




// Define route for user login
router.post("/loginuser", [
  body('email').isEmail(),
  body('password', 'Incorrect Password').isLength({ min: 5 })
], async (req, resp) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(400).json({ errors: errors.array() });
  }
  
  let { email, password } = req.body;

  try {
    let userData = await User.findOne({ email });
    if (!userData) {
      return resp.status(400).json({ errors: "Invalid credentials" });
    }

    // Compare hashed password with provided password
    const isMatch = (password === userData.password); // Assuming passwords are stored as plain text
    if (!isMatch) {
      return resp.status(400).json({ errors: "Invalid credentials" });
    }

    return resp.json({ success: true });
  } catch (error) {
    console.log(error);
    resp.status(500).json({ success: false, errors: "Server error" });
  }
});  




module.exports = router         


