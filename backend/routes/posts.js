const express = require('express')
const router = express.Router()
const Post = require('../modals/Post')
const User = require('../modals/User')
const Comments = require('../modals/Comments')
const {cloudinary} = require('../utils/Cloudinary')

//create post

router.post('/',async(req,res)=>{
    console.log(req.body);
    const newPost = await new Post(req.body)
    try{
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    }
    catch(error){
        res.status(500).json(error)
    }
})

//add comment

router.post('/comment', async(req,res)=>{
    const newComment = await new Comments(req.body)
    try{
        const savedComment = await newComment.save()
        res.status(200).json(savedComment)
    }
    catch(error)
    {
        res.status(500).json(error)
    }
})

router.get('/comment/:postId',async(req,res)=>{
    try {
        const comment = await Comments.find({postId:req.params.postId}).sort({createdAt:-1})
        res.status(200).json(comment)
    } catch (error) {
        
    }
})

//get timeline posts
router.get('/timeline/:userId',async(req,res) => {
    
    try{
        const currentUser = await User.findById(req.params.userId)
        const userPost = await Post.find({userId:currentUser._id})
        console.log(1);
        const friendPosts = await Promise.all(
            currentUser.following.map((friendId) => {
                return Post.find({userId:friendId})
            })
        )
        console.log(2);
        console.log(friendPosts);
        res.status(200).json(userPost.concat(...friendPosts))
    }
    catch(err)
    {
        res.status(500).json(err)
    }
})

//! like or dislike post
router.put('/:id/like', async(req,res) => {
    try{
        const post  = await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId))
        {
            await post.updateOne({$push:{ likes: req.body.userId}})
            res.status(200).json("The post has been Liked")
        }
        else{
            await post.updateOne({$pull:{likes: req.body.userId}})
            res.status(200).json('The post has been disliked')
        }
    }
    catch(err)
    {
        res.status(500).json(err)
    }
})

//! like or dislike comments
router.put('/comment/:id/like', async(req,res) => {
    try{
        const comment  = await Comments.findById(req.params.id)
        if(!comment.likes.includes(req.body.userId))
        {
            await comment.updateOne({$push:{ likes: req.body.userId}})
            res.status(200).json("The post has been Liked")
        }
        else{
            await comment.updateOne({$pull:{likes: req.body.userId}})
            res.status(200).json('The post has been disliked')
        }
    }
    catch(err)
    {
        res.status(500).json(err)
    }
})

//!report post
router.put('/:id/report', async(req,res) => {
    try{
        const post  = await Post.findById(req.params.id)
        if(!post.reports.includes(req.body.userId))
        {
            await post.updateOne({$push:{ reports: req.body.userId}})
            res.status(200).json("The post has been Reported")
        }
        else{

            await post.updateOne({$pull:{reports: req.body.userId}})
            res.status(200).json('The post has been unReported')
        }
    }
    catch(err)
    {
        res.status(500).json(err)
    }
})

//add to favourite

router.put('/:id/favourite', async(req,res) => {
    try {
        const user = await User.findById(req.body.userId)
        if(!user.favourite.includes(req.params.id))
        {
            await user.updateOne({$push:{favourite: req.params.id}})
            res.status(200).json("added to favourite")
        }
        else
        {
            await user.updateOne({$pull:{favourite: req.params.id}})
            res.status(200).json('removed from favourite')
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//! get users's all posts
router.get('/profile/:username',async(req,res)=>{
    try{
        const user = await User.findOne({username:req.params.username})
        const posts = await Post.find({userId:user._id})
        res.status(200).json(posts)

    }
    catch(err)
    {
        res.status(500).json(err)
    }
})

//! get all post's
router.get('/all/',async(req,res)=>{
    try{
        
        const posts = await Post.find()
        res.status(200).json(posts)

    }
    catch(err)
    {
        res.status(500).json(err)
    }
})


//! upload a image
router.post('/upload',async(req,res)=>{
    try {
        const fileStr = req.body.image
        const uploadResponse = await cloudinary.uploader.upload(fileStr)
        res.status(200).json(uploadResponse.secure_url)
    } catch (error) {
        console.log(22);
        console.log(error);
        res.status(500).json(error+'eeeeeeor')
    }
})
//! delete post
router.delete('/:id', async(req,res) => {
    
    
    try {
        const post = await Post.findById(req.params.id)
            await post.deleteOne()
            res.status(200).json('the post has been deleted')
        
        
            // res.status(403).json('you can delete only your post')
        
    } catch (error) {
        res.status(500).json(error)
        
    }
})
//! delete comment
router.delete('/comment/:id', async(req,res) => {
    
    try {
        console.log(req.params.id);
        const comments = await Comments.findById(req.params.id)
            // console.log(comments);
            await comments.deleteOne()
            res.status(200).json('the comment has been deleted')        
    } catch (error) {
        res.status(500).json(error)
    }
})

//total comments
router.get('/comment',async(req,res) => {
    try {
        const total = await Comments.find()
        res.status(200).json(total.length)
    } catch (error) {
        console.log(error);
    }
})

//! find by id 
router.get('/:id', async(req,res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        
    }
})
module.exports = router