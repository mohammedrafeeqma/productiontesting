import { Button, Card, makeStyles, Typography } from "@material-ui/core";
import { Add, ImportantDevices, Remove } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { listuserDetails } from "../../actions/productAction";

const useStyles = makeStyles((theme) => ({
  rightBarTitle1: {
    margin:theme.spacing(3),
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: 500,
  },
  rightBarFriendList: {},
  rightbarInfo: {
    marginBottom: "30px",
  },
  rightbarInfoItem: {
    margin: theme.spacing(3),
    marginBottom: theme.spacing(1),
    

  },
  rightbarInfoKey: {
    fontWeight: 500,
    marginRight: "15px",
    color: "#555",
  },
  rightbarInfoValue: {
    fontWeight: 300,
  },
  rightbarFollowings: {
    // marginTop:theme.spacing(5),
    display: "flex",
    flexWrap: "wrap",
    // justifyContent: "baseline",
    // alignContent:'space-between',
    marginLeft:theme.spacing(3)


  },
  rightbarFollowing: {
    display: "flex",
    flexDirection: "column",
    alignItems:'space-between',
    paddingBottom: "0px",
    cursor: "pointer",
    '&:hover':{
      cursor:'pointer'
    }
    

  },
  rightbarFollowingImg: {
    // width: "100%",
    // height: "100px",
    objectFit: "cover",
    borderRadius: "5px",
    paddingRight: "10px",
    display: "flex",
    justifyContent: "end",
    marginRight:theme.spacing(1),
    

  },
  rightbarFollowingName: {
    alignItems: "center",
    fontSize:"18px",
    fontWeight:500,
    color:'black'
  },
  followButton:{
    backgroundColor:'#0D8E8E',
    color:'white',
    margin: theme.spacing(3)
  },
  follows:{
    marginTop:theme.spacing(2),
    display:'flex',
    // backgroundColor:'red',
    width:'43%',
    justifyContent:'space-between'
  },
  followers:{
    textAlign:'center'
  },
  followNum:{
    fontWeight:700,
    fontSize:'20px'
  },
  header:{
    display:'flex'
  },
  
}));

function ProfileRightBar({ user: profileUser }) {
  const dispatch = useDispatch();
  const id = localStorage.getItem("userId");

  useEffect(() => {
    dispatch(listuserDetails(id));
  }, [id, dispatch]);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const [friends, setFreinds] = useState([]);
  const [followed, setFollowed] = useState(user.following?.includes(profileUser?._id))
  const sameFriend = friends.username === user.username
  const navigate = useNavigate()


  useEffect(() => {
    setFollowed(user.following?.includes(profileUser?._id));
  });




  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/api/user/friends/" + profileUser?._id);
        setFreinds(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [profileUser,followed]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/api/user/${profileUser._id}/unfollow`, {
          userId: user._id,
        });
        dispatch(listuserDetails(id));
      } else {
        await axios.put(`/api/user/${profileUser._id}/follow`, {
          userId: user._id,
        });
        await axios.post('/api/notification/',{
          userId:profileUser._id,
          friendName:user.username,
          img:user.profilePicture,
          action:'Follows you'
        })
        dispatch(listuserDetails(id));
        await axios.post('/api/conversation/',{
          senderId:user._id,
          recieverId:profileUser._id
        })
      }
      setFollowed(!followed)
    
    } catch ({ response }) {
      setFollowed(user.following?.includes(profileUser?._id))
      console.log(response);
    }
  };
  const classes = useStyles();
  return (
    <>
      <div className={classes.header}>
      {profileUser.username !== user.username && (

        <Button className={classes.followButton} variant="contained" onClick={handleClick}>
          {followed ? "unfollow":'follow' }
          {followed ? <Remove/> : <Add/>}
          
        </Button>
      )}
      <div style={{marginLeft:'20px'}} className={classes.follows}>
          <div className={classes.followers}>
          <Typography className={classes.followNum}>{profileUser.followers?.length}</Typography>
          <Typography className={classes.followText}>Followers</Typography>
          </div>
          <div className={classes.followers}>
          <Typography className={classes.followNum}>{profileUser.following?.length}</Typography>
          <Typography className={classes.followText}>Followings</Typography>
          </div>
        </div>
        </div>


      <div className={classes.rightBarTitle}>
        
        <div className={classes.rightbarInfo}>
          <div className={classes.rightbarInfoItem}>
            <Typography variant="span" className={classes.rightbarInfoKey}>
              email:{" "}
            </Typography>
            <Typography variant="span" className={classes.rightbarInfoValue}>
              {profileUser.email}
            </Typography>
          </div>

          <div className={classes.rightbarInfoItem}>
            <Typography variant="span" className={classes.rightbarInfoKey}>
              Gender:{" "}
            </Typography>
            <Typography variant="span" className={classes.rightbarInfoValue}>
              {profileUser.gender}
            </Typography>
          </div>

          <div className={classes.rightbarInfoItem}>
            <Typography variant="span" className={classes.rightbarInfoKey}>
              Mobile:{" "}
            </Typography>
            <Typography variant="span" className={classes.rightbarInfoValue}>
              {profileUser.mobile}
            </Typography>
          </div>
        </div>

        <Typography className={classes.rightBarTitle1} variant="h4">Mutual Friends</Typography>
        <div className={classes.rightbarFollowings}>
          {console.log(friends)}
          {friends.map((friend) => (
            
            friend.username!==user.username &&
            <div onClick={()=>navigate('/profile/'+friend.username)} key={friend._id} className={classes.rightbarfollowing}>
              <div style={{marginBottom:'15px'}}>
                <img width='100' height='100'
                src={friend.profilePicture?friend.profilePicture:'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}
                className={classes.rightbarFollowingImg}
              />
              <div style={{marginLeft:'10px',marginTop:'5px'}}>
              <Typography className={classes.rightbarFollowingName} variant="span">{friend.username}</Typography>
              </div>

              </div>
              
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProfileRightBar;
