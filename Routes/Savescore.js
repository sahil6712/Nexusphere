const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { body, validationResult } = require('express-validator');

// Sample user authentication middleware
const authenticateUser = (req, res, next) => {
 

    router.post("/loginuser",[body('email').isEmail(),body('password','Incorrect Password').isLength({min:5})],async(req,resp)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return resp.status(400).json({errors:errors.array()});
        }
        let email = req.body.email
        try{
            let userData = await User.findOne({email});
            if(!userData){
                return resp.status(400).json({errors:"try login with correct credentials"})
            }
            if(req.body.password !== userData.password){
                return resp.status(400).json({errors:"try login with correct credentials"})
            }
            return resp.json({success: true})
        }
        catch(error){
            console.log(error)
            resp.json({success: false})
        }
    })


   next();
  next(); // Dummy middleware for illustration
};

router.post("/saveScore", authenticateUser, async (req, res) => {
  const { examId, score } = req.body;
  const userId = req.user.id; // Assuming user authentication middleware is implemented

  try {
    // Update or create a new user document to store score and exam ID
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { score: score, examId: examId } },
      { upsert: true, new: true }
    );

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
