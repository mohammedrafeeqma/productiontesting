const express = require("express");
const Comments = require("../modals/Comments");
const Post = require("../modals/Post");
const router = express.Router();
const User = require('../modals/User')

router.post("/login", (req, res) => {
  const username = "rafeeq";
  const password = "123";
  if (username === req.body.username && password == req.body.password) {
    res.status(200).json("login success");
  } else {
    res.status(400).json("incorrect password or username");
  }
});

router.get("/usersList", async (req, res) => {
  const user = await User.find()
  res.json(user)
});

router.get('/newUser',async(req,res)=>{
  const user = await User.find().sort({createdAt:-1}).limit(5)
  console.log(user);
  res.status(200).json(user)
})

//top following users
router.get('/topfollower', async(req,res) => {
  const  user = await User.aggregate([{
    $unwind:"$followers"
  },
  {
    $group:{_id: '$_id', count:{$sum:1},details:{'$push':'$$ROOT'}}
  },
  {
    $sort:{"count":-1}
  },
  {$limit:5}
])
 
  res.status(200).json(user)
})

//top liked posts
router.get('/toplikes', async(req,res) => {
  const  user = await Post.aggregate([{
    $unwind:"$likes"
  },
  {
    $group:{_id: '$_id', count:{$sum:1},details:{'$push':'$$ROOT'}}
  },
  {
    $sort:{"count":-1}
  },
  {$limit:5}
])
 
  console.log(user);
  res.status(200).json(user)
})

router.get('/monthly',async(req,res)=>{
  const user = await User.aggregate([
    {
      $group:{
        _id:{name:'rafeeq', month:{$month:'$createdAt'}},
        count:{ $sum:1}
      }
    },
    {
      $group:{
        _id:"$_id.name",
        monthlyusers:{$push:{name:'$_id.month',total:'$count'}}
      }
    },
    
    {
      $project:{_id:0,monthlyusers:1}
    }
  ])

  const data = user[0].monthlyusers
  const ds = data.sort()
  const naturalCollator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});

data.sort((a, b) => naturalCollator.compare(a.name, b.name));
  console.log(data);


  res.status(200).json(data)
})


router.get('/monthlypost',async(req,res)=>{
  const user = await Post.aggregate([
    {
      $group:{
        _id:{name:'rafeeq', month:{$month:'$createdAt'}},
        count:{ $sum:1}
      }
    },
    {
      $group:{
        _id:"$_id.name",
        monthlyusers:{$push:{name:'$_id.month',total_posts:'$count',gender:'$gender'}}
      }
    }
  ])

  const data = user[0].monthlyusers
  const ds = data.sort()
  const naturalCollator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});

data.sort((a, b) => naturalCollator.compare(a.name, b.name));
  console.log(data);


  res.status(200).json(data)
})

//comments

router.get('/comments',async(req,res)=>{
  const user = await Comments.aggregate([
    {
      $group:{
        _id:{name:'rafeeq', month:{$month:'$createdAt'}},
        count:{ $sum:1}
      }
    },
    {
      $group:{
        _id:"$_id.name",
        monthlyusers:{$push:{name:'$_id.month',total_posts:'$count',gender:'$gender'}}
      }
    }
  ])

  const data = user[0].monthlyusers
//   const ds = data.sort()
//   const naturalCollator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});

// data.sort((a, b) => naturalCollator.compare(a.name, b.name));
//   console.log(data);


  res.status(200).json(data)
})




//gender
router.get('/gender',async(req,res)=>{
  const user = await User.aggregate([
    {
      
      $group:{
        _id:{name:'$gender'},
        count:{ $sum:1}
      },
      
    },
    {
      $group:{
        _id:" ",
        monthlyusers:{$push:{name:'$_id.name',total:'$count'}}
      }
    },
    {
      $project:{_id:0,monthlyusers:1}
    },
    {$unwind:'$monthlyusers'}
    

  ])

  res.status(200).json(user)
})


module.exports = router;
