import {makeStyles} from "@material-ui/core"
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    chatOnline:{
        marginTop:theme.spacing(15),
        marginLeft:theme.spacing(3)
    },
    chatOnlineFriend:{
        display:'flex',
        alignItems:'center',
        fontWeight:500,
        cursor:'pointor',
        marginTop:'10px'
    },
    chatOnlineImgContainer:{
        position:'relative',
        marginRight:'10px'
    },
    chatOnlineImg:{
        width:'40px',
        height:'40px',
        borderRadius:'50%',
        objectFit:'cover',
        border:'1px solid white'
    },
    chatOnlineBadge:{
        width:'10px',
        height:'10px',
        borderRadius:'50%',
        backgroundColor:'limegreen',
        position:'absolute',
        top:'2px',
        right:'2px'
    }
}))

function ChatRight({onlineUsers}) {
    const classes = useStyles()
    const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const[friends, setFriends] = useState()
  const[onlineFriends, setOnlineFriends] = useState()
    useEffect(() => {
        
        const getFriends = async () => {
            try {
                 const res = await axios.get("/api/user/friends/" + user?._id);
                 console.log(res);
          setFriends(res.data);
            } catch (error) {
                console.log(error);
            }
         
        };
        getFriends();
      },[user?._id]);

      useEffect(() => {
        setOnlineFriends(friends?.filter((f) => onlineUsers?.includes(f._id)));
      }, [friends, onlineUsers]);

      console.log(onlineFriends);
  return (
    <div className={classes.chatOnline}>

        {onlineFriends?.map((o)=>{
            return(
                <div key={o._id} className={classes.chatOnlineFriend}>
            <div className={classes.chatOnlineImgContainer}>
                <img
                className={classes.chatOnlineImg}
                src={o.profilePicture?o.profilePicture:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7rGMpXCXWET099ikV3fUJ15Eqdnchm_rruyrCgf6cEWGXCWhbVhEu0qK2zyoPVkZi5tU&usqp=CAU'}
                />
                <div className={classes.chatOnlineBadge}> </div>
            </div>
            <span className={classes.chatOnlineName}>{o.username}</span>

             </div> 
            )
        })}
        
            
        
            
    </div>
  )
}

export default ChatRight