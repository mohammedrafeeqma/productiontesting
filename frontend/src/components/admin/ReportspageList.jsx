import {Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, Typography} from "@material-ui/core"
import { Close, RemoveCircleOutlineOutlined, RemoveRedEyeOutlined } from "@material-ui/icons"
import axios from "axios"
import { useEffect, useState } from "react"
import {format} from 'timeago.js'
import PostView from "../home/feed/PostView"

const useStyles = makeStyles((theme) => ({
  main:{
    marginTop: theme.spacing(2),
  },
  card:{
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center'
  },
  postImg:{
    height:'80px',
    width:'80px'
  },
  postDetails:{
    display:'flex'
  }
}))

function ReportspageList({post}) {
    const classes = useStyles()
    const[user, setUser] = useState()
    const[openPost, setOpenPost] = useState()
    const[confirm, setConfirm] =  useState()

    useEffect(()=>{
      const fetchPost = async ()=>{
        const res = await axios.post('/api/user/',{userId:post?.userId})
        setUser(res.data)
      }
      fetchPost()
    },[])

    const removeConfirm = ()=>{
      setConfirm(true)
    }
    const deletePost = async()=>{
      const res = await axios.delete('/api/post/'+post._id)
      setConfirm(false)

    }
  return (
    <div className={classes.main}>

          <>
          <Dialog style={{padding:'80px', paddingTop:'20px'}} fullWidth open={openPost} onClose={()=>setOpenPost(false)}>
      <Close style={{position:'absolute', right:8, top:8}} onClick={()=>setOpenPost(false)}/>
        <div style={{margin:'20px'}}>
          <PostView post={post}/>
        </div>
    </Dialog>
          { post?.reports.length>=1 &&
          <Card className={classes.card}>
        <div className={classes.postDetails}>
            <div>
              <img onClick={()=>setOpenPost(true)} className={classes.postImg} src={post.img} alt="" />
            </div>
            <div style={{marginLeft:'5px'}}>
              <Typography style={{fontFamily:'vollkorn',fontWeight:700}} variant="h6">Owner {user?.username}</Typography>
              <Typography variant="p">{post.likes.length} likes</Typography>
              <Typography variant="p" component="div">{format(post.createdAt)}</Typography>
            </div>
        </div>
        <div>
            <Typography style={{fontWeight:600,fontFamily:'vollkorn'}} variant="h6">{post?.reports.length} users Reported</Typography>
        </div>
        <div>
            <Button onClick={removeConfirm} style={{backgroundColor:"red", marginRight:"10px", color:'white'}} variant="contained">Remove <RemoveCircleOutlineOutlined style={{marginLeft:'5px'}}/> </Button>
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
            <Button onClick={()=>deletePost(post._id)} variant="contained" style={{color:'white', backgroundColor:'#0D8E8E'}}>Delete</Button>
            <Button variant="contained" onClick={()=>setConfirm(false)} style={{color:'#0D8E8E', backgroundColor:'white'}}>Cancel</Button>
        </DialogActions>

    </Dialog>

      </Card> }
          </>
      


      
    </div>
  )
}

export default ReportspageList