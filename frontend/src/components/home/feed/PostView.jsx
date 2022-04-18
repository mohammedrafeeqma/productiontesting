import {Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Snackbar, TextareaAutosize, Typography} from "@material-ui/core"
import { red } from "@material-ui/core/colors"
import { Delete, DeleteOutlined, Favorite, FavoriteBorderOutlined, MoreVert, Report, ThumbUp } from "@material-ui/icons"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import {format} from 'timeago.js'
import { Alert, Dialog, ListItemButton } from "@mui/material"
import { useNavigate } from "react-router"
import Comment from "./Comment"

const useStyles = makeStyles((theme) => ({
    container:{
        paddingTop: theme.spacing(10),
        backgroundColor: "white"
        
    },
    card:{
        
        marginBottom: theme.spacing(3),
        marginLeft: theme.spacing(1),
        [theme.breakpoints.up('sm')]:{
           marginLeft: theme.spacing(15),
           marginRight: theme.spacing(15)
        }
        
    },
    media:{
        height: 0,
    paddingTop: '56.25%',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
    },
    expand:{
        marginLeft:"auto"
    },
    avatar:{
        backgroundColor: red[500]
    },
    likeColor:{
        color:"primary",
        backgroundColor:red
    },
    cardContent:{
        position:'relative'
    },
   option:{
       padding:0,
       margin:0,
       position:'absolute',
       top:-25,
       right:20,
       backgroundColor:'white',
       border:'1px solid black',
       zIndex:'1'

    
   },
   avatarImg:{
       objectFit:'fill',
       width:'40px',
       height:'40px'
   }
   
    
}))

function PostView({post}) {
    
    const classes = useStyles()
    const[userFriend, setUserFriend] = useState()
    const[like, setLike] = useState(post ?.likes.length)
    const[isLiked, setIsLiked] = useState(false)
    const[postOption, setPostOption] = useState(false)
    const[refresh, setRefresh] = useState(false)
    const[confirm, setConfirm] = useState(false)
    const[alertBar, setAlertBar] = useState(false)
    const[openComment, setOpenComment] = useState(false)
    const[message, setMessage] = useState('')
    const[comment, setComment] = useState([])
    const[commentMsg, setCommentMsg] = useState('')
    const userDetails = useSelector( state => state.userDetails)
    const{ loading, error, user} = userDetails
    let userPost = user?.username === userFriend?.username
    const navigate = useNavigate()
   const isFavourite = user.favourite?.includes(post._id)

    useEffect(()=>{
        setIsLiked(post?.likes.includes(user._id))
    },[user._id, post?.likes,refresh])

    // useEffect(()=>{
    //     const fetchPost = async()=>{
    //         const res = await axios.get('/api/post/'+postId)
    //         setPost(res.data)
    //     }
    //     fetchPost()
    // })

    useEffect(()=>{
        const fetchUser = async()=>{
            const res = await axios.get(`/api/user?userId=${post.userId}`)
            setUserFriend(res.data)
            
        }
        fetchUser()
    },[post?.userId,post,refresh])

       const fetchComment = async(p)=>{
            setOpenComment(!openComment)
            const res = await axios.get('/api/post/comment/'+p)
            setComment(res.data)
            console.log(comment);
        }
        
    
    const likeHandler = ()=>{
        try{
            axios.put('/api/post/'+post._id+'/like',{userId: user._id})
        }
        catch(err)
        {}
            setLike(isLiked ? like-1: like+1);
            setIsLiked(!isLiked)
        
    }
    const reportHandle = async() => {
        try {
            const res = await axios.put('/api/post/'+post._id+'/report',{userId:user._id})
            setMessage(res.data)
            setPostOption(false)
            setAlertBar(true)
        } catch (error) {
            
        }
    }
    const addToFavourite = async()=>{

        try {
           const res = await axios.put('/api/post/'+post._id+'/favourite', {userId: user._id})
           if(res)
           {
            setMessage(res.data)
            setPostOption(false)
            setAlertBar(true)
           }
        } catch (error) {
            
        }
    }
    const deleteHandle = async()=>{
        setConfirm(true)
    }
    const deletePost=async()=>{
         const res = await axios.delete('/api/post/'+post._id, {userId: user?._id})
         window.location.reload()
         setRefresh(!refresh)
         
    }
    const cancelDelete = ()=>{
        setConfirm(false)
        setPostOption(false)

    }

    const commentHandle = async()=>{
       try {
           const res = await axios.post('/api/post/comment/',{userId:user?._id, postId:post._id,comment:commentMsg})
           if(res.data)
           {
               setCommentMsg('')
               fetchComment(post._id)
               setOpenComment(true)
           }
       } catch (error) {

           
       }
    }
    
  return (
    <>
        
    <Snackbar open={alertBar} onClose={()=>setAlertBar(false)} autoHideDuration={2000}>
        <Alert onClose={()=>setAlertBar(false)} severity='success'>{message}</Alert>
    </Snackbar>

    {post?
    <Card className={classes.card}>
        <CardHeader
        avatar={
            <Avatar onClick={()=>{navigate('/profile/'+userFriend.username)}} className={classes.avatar}>
                <img className={classes.avatarImg} src={userFriend?.profilePicture? userFriend.profilePicture:'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}/>
            </Avatar>
        }
        action={
            <IconButton aria-label="settings" onClick={()=>{setPostOption(!postOption)}}>
                <MoreVert />
                  
            </IconButton>
            
        }
        title=  {userFriend? userFriend.username :''}
        subheader={format(post.createdAt)}
        >

        </CardHeader>
        <CardContent className={classes.cardContent}>
        {postOption&&  <List sx={{ width: '100%', maxWidth: 360 }} className={classes.option}>
                       {userPost&& <ListItem  disablePadding>
                            <ListItemButton onClick={deleteHandle}>
                                <ListItemIcon>
                                    <Delete/>
                                </ListItemIcon>
                                <ListItemText primary='Delete'/>
                            </ListItemButton>
                        </ListItem>}
                        <ListItem onClick={reportHandle} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Report/>
                                </ListItemIcon>
                                <ListItemText primary='Report'/>
                            </ListItemButton>
                        </ListItem>
                        {post.img && <ListItem disablePadding>
                            <ListItemButton onClick={addToFavourite}>
                                <ListItemIcon>
                                    <Favorite  color={isFavourite? 'secondary':'amber'}/>
                                </ListItemIcon>
                                <ListItemText primary='Favourite'/>
                            </ListItemButton>
                        </ListItem>}
                </List>
                
                }
            <CardActions>
                <Typography variant="body2" color="textSecondary" component="p">
                    {post.desc}
                </Typography>
            </CardActions>
        </CardContent>
        {post.img?
        <CardMedia
        className={classes.media}
        image={post.img}
        title = "city"
        />
        :''}
        
        <CardActions disableSpacing>
            <IconButton aria-label="like" className={classes.likeColor} onClick={likeHandler}>
                <ThumbUp style={isLiked?{color:"#2ab0b0"}:{color:""}}/>  
            </IconButton>
            <Typography>{like}</Typography>
            <IconButton aria-label="like" className={classes.expand}>
                <Typography onClick={()=>fetchComment(post._id)}>Comments</Typography>
            </IconButton>
        </CardActions>
        {comment.map((c)=>{
            return(
               <Comment c={c} openComment={openComment}/>
               
            )
        })}
        <div style={openComment?{display:'flex', justifyContent:'space-around',marginBottom:'10px'}:{display:'none'}}>
        <TextareaAutosize
        value={commentMsg}
        onChange={(e)=>setCommentMsg(e.target.value)}
        minRows={2}
        placeholder="Comments"
        style={{width:'70%', borderRadius:'10px',paddingLeft:'8px',paddingTop:'8px'}}
        />

        <Button onClick={commentHandle}  variant="contained" style={{color:'white', backgroundColor:'green',height:'35px'}}>Send</Button>

    </div>
            

        <Dialog open={confirm} onClose={()=>setConfirm(false)}>
        <DialogTitle style={{fontWeight:700}}>
            Delete?
        </DialogTitle>
        <hr/>
        <DialogContent>
        Items that you delete can't be restored.
        </DialogContent>
        <DialogActions>
            <Button onClick={()=>deletePost(post)} variant="contained" style={{color:'white', backgroundColor:'#0D8E8E'}}>Delete</Button>
            <Button variant="contained" onClick={()=>cancelDelete()} style={{color:'#0D8E8E', backgroundColor:'white'}}>Cancel</Button>
        </DialogActions>

    </Dialog>

    </Card>
    :""}

    
    </>
  )
}

export default PostView