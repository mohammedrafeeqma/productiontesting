import {makeStyles} from "@material-ui/core"
import axios from "axios";
import { useEffect, useState } from "react";
import {format} from 'timeago.js'
const useStyles = makeStyles((theme) => ({
    message:{
        display:'flex',
        flexDirection:'column',
        marginTop:'20px',
        marginLeft:'9px'
    },
    messageTop:{
        display:'flex'
    },
    messageImg:{
        width:'32px',
        height:'32px',
        borderRadius:'50%',
        objectFit:'cover',
        marginRight:'10px'
    },
    messageText:{
        padding:'10px',
        borderRadius:'20px',
        backgroundColor:'#0D8E8E',
        color:'white',
        maxWidth:'300px'
    },
    messageTextOwn:{
        padding:'10px',
        borderRadius:'20px',
        backgroundColor:'white',
        color:'#0D8E8E',
        maxWidth:'300px'
    },
    messageBottom:{
        fontSize:'12px',
        marginTop:'10px'
    },
    own:{
        display:'flex',
        flexDirection:'column',
        marginTop:'20px',
        alignItems:'flex-end',
        backgroundColor:'',
        color:'black',
        marginRight:'10px'
    }
}))

function Message({message,own}) {
    
    const[user, setUser] = useState()
    const classes = useStyles()
    // useEffect(()=>{
    //     const fetchUser = async () =>{
    //       const res = await axios.get(`/api/user?userId=${message.sender}`)
    //       console.log(res.data);
    //       setUser(res.data)
    //     }
    //     fetchUser()
    //   },[own])


  return (
    <>
    <div className={own ? classes.own :classes.message}>
        <div className={classes.messageTop}>
            <img
            className={classes.messageImg}
            src='https://www.kindpng.com/picc/m/207-2074624_white-gray-circle-avatar-png-transparent-png.png'
            />
            <p className={own ? classes.messageTextOwn :classes.messageText}>{message.text}</p>
        </div>
        <div className={classes.messageBottom}>{format(message.createdAt)}</div>
    </div>
    </>
  )
}

export default Message