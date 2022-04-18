import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { Chat, PeopleAlt, Person, PersonAdd} from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { listuserDetails } from "../../actions/productAction";
import Sugested from "../friends/Sugested";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(10),
    backgroundColor: grey[100],
    marginRight: theme.spacing(20),
    marginLeft: theme.spacing(20),
  },
  profileImg: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  mainDiv: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  leftDiv: {
    display: "flex",
    alignItems: "center",
  },
  info: {
    marginLeft: theme.spacing(2),
  },
  main:{
    marginTop: theme.spacing(4),
},
mainDiv:{
    display:'flex',
    justifyContent:'space-between',
    flexWrap:'wrap',
},
cardContent:{
    textAlign:'center'
},
mainText:{
    fontSize:'18px'
},
followButton:{
    marginTop:theme.spacing(1),
    backgroundColor:'#0D8E8E',
    color:'white'
}
}));

function All() {
  const classes = useStyles();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const id = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const [followed, setFollowed] = useState();
  const [friends, setFriends] = useState();
  const [searchUser, setSearchUser] = useState();
  const { searchkey } = useParams();
  const navigate = useNavigate()
  const[randomNumber, setRandomNumber] = useState(0)
  const[randomNumber1, setRandomNumber1] = useState(0)
  const[randomNumber2, setRandomNumber2] = useState(0)
  const[randomNumber3, setRandomNumber3] = useState(0)
  const[randomNumber4, setRandomNumber4] = useState(0)
  const[randomNumber5, setRandomNumber5] = useState(0)
  const[freinds, setFreinds] = useState([])

  
  useEffect(() => {
    dispatch(listuserDetails(id));
  }, [id, dispatch]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/api/user/search/" + searchkey);
      setSearchUser(res.data);
    };
    fetchUser();
  }, [searchkey]);
  useEffect(() => {
    const getFriends = async () => {
        
      try {
        const friendList = await axios.get(
          "/api/user/friends/" + searchUser?._id
        );
        setFriends(friendList.data);

      } catch (error) {}
    };
    getFriends();
   
  }, []);

  useEffect(() => {
    setFollowed(user.following?.includes(searchUser?._id));
    console.log(user.following?.includes(searchUser?._id))
    
  }, []);

  //did you know page
  const generateRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * freinds?.length);
    setRandomNumber(randomNumber)
}
const generateRandomNumber1 = () => {
    const randomNumber1 = Math.floor(Math.random() * freinds?.length);
    setRandomNumber1(randomNumber1)
}

const generateRandomNumber2 = () => {
    const randomNumber2 = Math.floor(Math.random() * freinds?.length);
    setRandomNumber2(randomNumber2)
}

const generateRandomNumber3 = () => {
    const randomNumber3 = Math.floor(Math.random() * freinds?.length);
    setRandomNumber3(randomNumber3)
}

const generateRandomNumber4 = () => {
    const randomNumber4 = Math.floor(Math.random() * freinds?.length);
    setRandomNumber4(randomNumber4)
}

const generateRandomNumber5 = () => {
    const randomNumber5 = Math.floor(Math.random() * freinds?.length);
    setRandomNumber5(randomNumber5)
}
useEffect(()=>{
    generateRandomNumber()
    generateRandomNumber1()
    generateRandomNumber2()
    generateRandomNumber3()
    generateRandomNumber4()
    generateRandomNumber5()
},[freinds])


useEffect(()=>{
    dispatch(listuserDetails(id));
},[id, dispatch])
useEffect(()=>{
    const fetchFriends = async()=>{
        const res = await axios.get('/api/user/usersList')
        console.log(res.data)   
        setFreinds(res.data)
    }
    fetchFriends()
},[user._id])




  return (
    <>
      <Card className={classes.card}>
        <Box>
          <CardContent>
            <Typography component="div" variant="h5">
              People
            </Typography>

            {searchUser?.length>0
              ? searchUser.map((u) => {
                  return (
                    <div key={u._id}>
                      <div className={classes.mainDiv}>
                        <div className={classes.leftDiv}>
                          <div className={classes.profile}>
                            <img onClick={()=>{navigate('/profile/'+u.username)}}
                              className={classes.profileImg}
                              src={
                                u.profilePicture
                                  ? u.profilePicture
                                  : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                              }
                            />
                          </div>
                          <div className={classes.info}>
                            <Typography>{u.username}</Typography>
                            <div style={{ display: "flex" }}>
                              <PeopleAlt style={{ marginRight: "5px" }} />
                              <Typography>
                                {u.following.length} mutual friends
                              </Typography>
                            </div>
                            <Typography>{u.email}</Typography>
                          </div>
                        </div>
                        <div className={classes.friendDetails}>
                           {user.following.includes(u._id)} 
                          {user.following.includes(u._id) ? <Chat /> : <PersonAdd/>}
                        </div>
                      </div>
                      <hr />
                    </div>
                  );
                })
              : <div>
                <div style={{width:'100%',display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
                <Person style={{fontSize:'84px',color:'grey'}}/>
                <h1 style={{color:'grey'}}>users not found</h1>
                
                </div>
                <div>
                  <h1 style={{marginBottom:'15px'}}>did you know ?</h1>
            <div className={classes.mainDiv}> 
    

            <Card style={{width:'170px',marginRight:'15px'}} className={classes.card1}>
        <CardMedia
        className={classes.cardImage}
        component="img"
        height='140'
        image={freinds[randomNumber]?.profilePicture? freinds[randomNumber]?.profilePicture :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuSMA98U5nhBmtcdj2hmFD4ijUIue_fCxNWw&usqp=CAU'}
        >

        </CardMedia>
        <CardContent className={classes.cardContent}>
            <Typography className={classes.mainText} variant="h5" component="div">{freinds[randomNumber]?.username}</Typography>
            <Typography className={classes.text} variant="p" component='div'>1 mutual Friends</Typography>
            <Button onClick={()=>navigate('/profile/'+freinds[randomNumber]?.username)} className={classes.followButton} variant="contained">View Profile</Button>
        </CardContent>
        </Card>



        <Card style={{width:'170px',marginRight:'15px'}} className={classes.card1}>
        <CardMedia
        className={classes.cardImage}
        component="img"
        height='140'
        image={freinds[randomNumber1]?.profilePicture? freinds[randomNumber1]?.profilePicture :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuSMA98U5nhBmtcdj2hmFD4ijUIue_fCxNWw&usqp=CAU'}
        >

        </CardMedia>
        <CardContent className={classes.cardContent}>
            <Typography className={classes.mainText} variant="h5" component="div">{freinds[randomNumber1]?.username}</Typography>
            <Typography className={classes.text} variant="p" component='div'>1 mutual Friends</Typography>
            <Button onClick={()=>navigate('/profile/'+freinds[randomNumber1]?.username)} className={classes.followButton} variant="contained">View Profile</Button>
        </CardContent>
        </Card>


        <Card style={{width:'170px',marginRight:'15px'}} className={classes.card1}>
        <CardMedia
        className={classes.cardImage}
        component="img"
        height='140'
        width='100'
        image={freinds[randomNumber2]?.profilePicture? freinds[randomNumber2]?.profilePicture :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuSMA98U5nhBmtcdj2hmFD4ijUIue_fCxNWw&usqp=CAU'}
        >

        </CardMedia>
        <CardContent className={classes.cardContent}>
            <Typography className={classes.mainText} variant="h5" component="div">{freinds[randomNumber2]?.username}</Typography>
            <Typography className={classes.text} variant="p" component='div'>1 mutual Friends</Typography>
            <Button onClick={()=>navigate('/profile/'+freinds[randomNumber2]?.username)} className={classes.followButton} variant="contained">View Profile</Button>
        </CardContent>
        </Card>



        <Card style={{width:'170px',marginRight:'15px'}} className={classes.card1}>
        <CardMedia
        className={classes.cardImage}
        component="img"
        height='140'
        image={freinds[randomNumber3]?.profilePicture? freinds[randomNumber3]?.profilePicture :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuSMA98U5nhBmtcdj2hmFD4ijUIue_fCxNWw&usqp=CAU'}
        >

        </CardMedia>
        <CardContent className={classes.cardContent}>
            <Typography className={classes.mainText} variant="h5" component="div">{freinds[randomNumber3]?.username}</Typography>
            <Typography className={classes.text} variant="p" component='div'>1 mutual Friends</Typography>
            <Button onClick={()=>navigate('/profile/'+freinds[randomNumber3]?.username)} className={classes.followButton} variant="contained">View Profile</Button>
        </CardContent>
        </Card>
    
    

    </div>


                </div>
                </div>}
          </CardContent>
        </Box>
      </Card>
    </>
  );
}

export default All;
