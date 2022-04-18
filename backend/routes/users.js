const express = require("express");
const User = require("../modals/User");
const { cloudinary } = require("../utils/Cloudinary");
const router = express.Router();

//follow user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    console.log(req.body.userId);
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

//! unfollow user
router.put('/:id/unfollow', async (req,res) => {
  if(req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)
      if(user.followers.includes(req.body.userId)) {
        await user.updateOne({$pull: { followers: req.body.userId}})
        await currentUser.updateOne({$pull:{following: req.params.id}})
        res.status(200).json("user has been unfollowed")
      }
      else{
        console.log(2);
        res.status(403).json('you dont follow this user')
      }
    }
    catch(err){
      res.status(500).json(err)

    }
  }
  else{
    res.status(403).json("you cant unfollow yourself")
  }
})

//get user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});
//! get user by id
router.post('/',async(req,res)=>{
  try {
    const user = await User.findById(req.body.userId)
    res.status(200).json(user)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
})

//! get friends
router.get('/friends/:userId',async(req,res)=>{
  try{
    const user = await User.findById(req.params.userId)
    const friends = await Promise.all(
      user.following.map((friendId)=>{
        return User.findById(friendId)
      })
    )
  
    let friendList = []
    friends.map((friend) => {
      const{_id, username, profilePicture} = friend
      friendList.push({_id, username,profilePicture})
    })
    res.status(200).json(friendList)
  }
  catch(err)
  {
    res.status(500).json(err)
  }
})

//! update user
router.put('/:id',async(req,res)=>{
  try {
    const user = await User.findByIdAndUpdate(req.params.id,{
      $set:req.body
    })
    res.status(200).json('Account has been updated')
  } catch (error) {
    
  }
})

//! update profile
router.post('/upload/:id',async(req,res)=>{
  try {
    const image = req.body.image
    const user = await User.findById(req.params.id)
    const uploadResponse = await cloudinary.uploader.upload(image)
    await User.findByIdAndUpdate(user._id,{$set:{profilePicture:uploadResponse.secure_url}})
    res.status(200).json("profile has been updated")
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
})

//! update cover pic
router.post('/uploadcover/:id',async(req,res)=>{
  try {
    const image = req.body.image
    const user = await User.findById(req.params.id)
    const uploadResponse = await cloudinary.uploader.upload(image)
    await User.findByIdAndUpdate(user._id,{$set:{coverPicture:uploadResponse.secure_url}})
    res.status(200).json("profile has been updated")
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
})

//! search user
router.get('/search/:key',async(req,res)=>{
  console.log(req.params.key);
  const user = await User.find({username:{$regex:'^'+req.params.key+'.*', $options:'i'}})
  console.log(user);
  res.status(200).json(user)
})

//! all user
router.get("/usersList", async (req, res) => {
  const user = await User.find()
  console.log(user);
  res.json(user)
});

//! delete user
router.delete('/:id',async(req,res)=>{
  try {
    const user = await User.findById(req.params.id)
            await user.deleteOne()
            res.status(200).json('the post has been deleted')
  } catch (error) {
    console.log(error);
  }
  res.status(200).json('the user is deleted')
})

module.exports = router;
