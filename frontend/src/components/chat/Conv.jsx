import {makeStyles} from "@material-ui/core"
import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const useStyles = makeStyles((theme) => ({
  conversation:{
    display:'flex',
    alignItems:'center',
    padding:'10px',
    cursor:'pointer',
    marginTop:'10px',
},
conversationImg:{
    width:'40px',
    height:'40px',
    borderRadius:'50%',
    objectFit:'cover',
    marginRight:'20px'
},
conversationName:{
    fontWeight:500
},
searchInput:{
    marginTop:theme.spacing(15),
    marginLeft: theme.spacing(5),
    width: '80%',
    border: 'none',
    borderBottom: '1px solid gray'
}
}))

function Conv({conversation}) {
  
    const[convUser, setconvUser] = useState('')
    const classes = useStyles()
    const userDetails = useSelector((state) => state.userDetails);
    const {loading, error, user} = userDetails;
    
    useEffect(()=>{
      const friendId = conversation?.members.find((m)=> m !== user?._id)
        const getUser = async()=>{
            const res = await axios.get('/api/user?userId='+friendId)
            setconvUser(res.data)
        }
        getUser()
    },[])
  return (
    <>
    <div className={classes.conversation}>
            <img
            className={classes.conversationImg}
            src ={convUser.profilePicture? convUser.profilePicture : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}
            />
            <span className ={classes.conversationName}>{convUser?.username}</span>
    </div>
    </>
  )
}

export default Conv