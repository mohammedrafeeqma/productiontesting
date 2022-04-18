import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { AnnouncementOutlined } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { listuserDetails } from "../../../actions/productAction";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    position: "fixed",
    top: 0,

    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  birthdaySpanText: {
    fontWeight: 700,
  },
  rightBarTitle: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    fontSize: "18px",
    fontWeight: 500,
  },
  onlineFriends: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  onlineFriendsIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginBottom:'9px'
  },
  onlineFriendsText: {
    fontWeight: 500,
    fontSize: "18px",
    marginLeft: theme.spacing(1),
  },
  onlineIcon: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "limegreen",
    position: "absolute",
    top: -6,
    left: 24,
    border: "2px solid white",
  },
}));

function Rightbar({onlineUsers}) {
  const classes = useStyles();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const[friends, setFriends] = useState()
  const[onlineFriends, setOnlineFriends] = useState()
  const dispatch = useDispatch();
  let { id } = useParams();
  useEffect(() => {
    dispatch(listuserDetails(id));
  }, [id, dispatch]);

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
  

  return (
    <Container className={classes.container}>
      <Card style={{width:'25%'}}>
        <CardContent style={{ display: "flex" }}>
          <CardMedia
            className={classes.cover}
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR9-qTFZHMCeME1tDwmwOBW6rsCU-hB8W0VQ&usqp=CAU"
            title="live from rafee"
            style={{
              height: "40px",
              width: "50px",
              objectFit: "contain",
              marginRight: "10px",
            }}
          />
          <Typography>
            <Box
              className={classes.birthdaySpanText}
              component="div"
              display="inline"
            >
              Rafeeq Ma
            </Box>{" "}
            and
            <Box
              component="div"
              display="inline"
              className={classes.birthdaySpanText}
            >
              {" "}
              6 other friends{" "}
            </Box>
            have birthday today
          </Typography>
        </CardContent>
      </Card>

      <Box>
        <Typography className={classes.rightBarTitle} variant="h4">
          Online Friends
        </Typography>

        {onlineFriends?.length>0? onlineFriends.map((o)=>{
          return(
            <div key={o._id} className={classes.onlineFriends}>
          <img src={o.profilePicture} className={classes.onlineFriendsIcon} />
          <Box
            component="div"
            display="inline"
            className={classes.onlineIcon}
          ></Box>
          <Typography className={classes.onlineFriendsText}>{o.username}</Typography>
        </div>
          )
        }):<div style={{width:'20%',textAlign:'center'}}>
          <AnnouncementOutlined style={{fontSize:'44px'}}/>
          <Typography style={{color:'grey'}} variant="p" component='div'>You have no friends online</Typography>
          
          <Typography style={{color:'grey',marginLeft:'0px'}} variant="p">at the moment</Typography>
          
          </div>}
        

        

       
      </Box>
    </Container>
  );
}

export default Rightbar;
