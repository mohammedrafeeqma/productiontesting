const express = require("express");
const router = express.Router();
const User = require("../modals/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//Signup
router.post("/signup", async (req, res,next) => {
  console.log("signup");
  console.log(req.body);

  try{
      //generate hashed password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // create new User
    const newUser = await new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        mobile: req.body.mobile,
        Dob: req.body.selectDate,
        gender:req.body.gender,
        password: hashedPassword,
      });

    // save user and return response
    const user = await newUser.save()
    
    res.status(200).json(user)
  }
  catch(err){
    res.status(500).json(err)
    
  }
});

//login
// router.post("/login", async (req,res)=>{
//   console.log(req.body);
//     try{
//       console.log(1);
//         const user = await User.findOne({username: req.body.username})
//         !user && res.status(404).json("user not found")
//         if(!user)
//         {
//           console.log(33);
//           res.status(400).json("user not found")
//         }else{

//           console.log(2);
//           const validPassword = await bcrypt.compare(req.body.password, user.password)
//           !validPassword && res.status(400).json("wrong password")
//         console.log(3);
//           res.status(200).json(user)
//         }
//     }
//     catch(err){
//       console.log(6666);
//       console.log(err.message);
        
//     }
// })

router.post("/login", async (req,res)=>{
    try{
        const user = await User.findOne({username: req.body.username})
        console.log(user);
        if(!user)
        {
          console.log('user not found');
          res.status(404).json('user not found')
        }else{

          console.log('user found');
          const validPassword = await bcrypt.compare(req.body.password, user.password)
          !validPassword && res.status(400).json("wrong password")
        console.log(3);
           const token = jwt.sign({id:user.id}, "rafeeq" ,{ expiresIn: 300,})

          res.status(200).json({user,token})
        }
    }
    catch(err){
      console.log(6666);
      console.log(err.message);
        
    }
})

router.get('/login/:id', async(req,res)=>{
  const user = await User.findById(req.params.id)
  res.json(user)
})

module.exports = router;
