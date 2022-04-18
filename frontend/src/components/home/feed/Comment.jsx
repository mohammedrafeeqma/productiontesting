import {Button, makeStyles, TextareaAutosize, Typography} from "@material-ui/core"
import { grey } from "@material-ui/core/colors"
import { Delete, ThumbUp, ThumbUpOutlined } from "@material-ui/icons"
import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {format} from 'timeago.js'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({}))

function Comment({fetchComment, openComment,c}) {
    const classes = useStyles()
    const[commentUser, setCommentUser] = useState('')
    const userDetails = useSelector( state => state.userDetails)
    const{ loading, error, user} = userDetails
    const[commentLike, setCommentLike] = useState(c?.likes.length)
    const[isLiked, setIsLiked] = useState(false)
    const[owner, setOwner] = useState(false)
    const[refresh, setRefresh] = useState(false)
    useEffect(()=>{
        const fetchUser = async()=>{
            const res = await axios.post('/api/user/',{userId:c.userId})
            setCommentUser(res.data)

        }
        fetchUser()
    },[refresh])

    useEffect(()=>{
        setOwner(user._id===c.userId)
    })
 
    useEffect(()=>{
        setIsLiked(c?.likes.includes(user._id))
    },[user._id,c?.likes,refresh])
    const commentLikeHandler = ()=>{
        try {
        axios.put('/api/post/comment/'+c._id+'/like',{userId:user._id})
        } catch (error) {  }
        setCommentLike(isLiked ? commentLike-1 : commentLike+1)
        setIsLiked(!isLiked)
    }
    const commentDeleteHandler = async()=>{
        try {
             await axios.delete('/api/post/comment/'+c._id)
            
                // openComment(true)
                // setRefresh(!refresh)
                fetchComment()
                
               
            
            
        } catch (error) {
            
        }
    }


  return (
   <>
  {c.comment && <div style={ openComment? {margin:'10px', display:'flex', backgroundColor:'', width:'95%', position:'relative',zIndex:'6' }:{display:'none'}}>
                <div>
                <img width='30' height='30' style={{borderRadius:'50%',marginTop:'3px'}} src={commentUser.profilePicture} alt="" />
                </div>
                <div style={{margin:'0 8px', padding:'8px', backgroundColor:grey[100], width:'100%', Minheight:'30px', borderRadius:'20px'}}>
                    
                    <div>
                        <Typography style={{fontSize:'14px', marginRight:'8px'}} variant="h6" component='span'>{commentUser.username}</Typography>
                        <Typography style={{fontSize:'12px'}} variant="p" component='span'>{format(c.createdAt)}</Typography>
                        
                        {/* <Typography style={{fontSize:'12px'}} variant="p" component='span'>{moment(commentUser.createdAt).startOf('hour').fromNow()}</Typography> */}

                    </div>
                    <p>{c.comment}</p>
                </div>
               { owner && <div style={{position:'absolute',right:20, top:0}}>
                <Delete onClick={commentDeleteHandler} style={{color:'grey',width:'15px'}}/>
                </div> }
                <div style={{position:'absolute',right:20, bottom:-9,display:'flex'}}>
                <ThumbUp onClick={commentLikeHandler} style={isLiked?{width:'15px', color:'#0D8E8E',marginRight:'3px'}:{width:'15px',color:'gray',marginRight:'3px'}}/>
                <Typography style={{marginTop:'4px',fontSize:'14px'}} variant="p">{commentLike}</Typography>
                </div>
    </div> }
   </>
  )
}

export default Comment