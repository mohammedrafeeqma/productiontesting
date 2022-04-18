import {
  alpha,
  AppBar,
  Avatar,
  Badge,
  Card,
  Fade,
  InputBase,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  Cancel,
  ExitToAppOutlined,
  FeedbackOutlined,
  MenuOutlined,
  MessageOutlined,
  NotificationsActive,
  PersonAdd,
  Search,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productAction";
import axios from "axios";
import {format} from 'timeago.js'
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: "#0D8E8E",
  },
  logoLg: {
    display: "none",
    fontFamily: 'Bree Serif',
    fontSize:'28px' ,
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    "&:hover":{
      cursor:'pointer'
    }
  },
  logoSm: {
    display: "block",
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  search: {
    display: "flex",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    width: "25%",
    [theme.breakpoints.down("md")]: {
      display: (props) => (props.open ? "flex" : "none"),
      width: (props) => (props.open ? "60%" : "25%"),
    },
  },
  input: {
    color: "white",
    marginLeft: theme.spacing(2),
  },
  icons: {
    display: "flex",
    alignItems: "center",
    display: (props) => (props.open ? "none" : "flex"),
    "&:hover":{
      cursor:'pointer'
    }
  },
  badge: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginRight: theme.spacing(2),
    },
  },
  chatBadge: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  searchButton: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  cancel: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  menu: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  more: {
    marginTop: theme.spacing(6),
  },
  notification:{
    // padding:'5px',
    '&:hover':{
      cursor:'pointer',
      backgroundColor:grey[100]
    }
  }
}));

function 
Navbar(props) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const classes = useStyles({ open });
  const [anchorE1, setAnchorE1] = useState(null);
  const more = Boolean(anchorE1);
  const[openNotification, setOpenNotification] = useState(false)
  const[searchValue, setSearchValue] = useState('')
  const userDetails = useSelector( state => state.userDetails)
  const[notification, setNotification] = useState([])
  
    const{ loading, error, user} = userDetails
  const handleMoreClick = (event) => {
    setAnchorE1(event.currentTarget);
  };
  const handleMoreClose = () => {
    setAnchorE1(null);
  };
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    navigate("/login");
  };

  const dispatch = useDispatch();

  useEffect(()=>{
    const fetchNotification =async ()=>{
      const res = await axios.get('/api/notification/'+user._id)
      setNotification(res.data)
    }
    fetchNotification()
  },[user])

  console.log(notification);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const searchHandler = (e)=>{
      setSearchValue(e.target.value)
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    navigate('/search/'+searchValue)
  }

  return (
    <>
    <AppBar position="fixed" className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <MenuOutlined
          className={classes.menu}
          onClick={() => props.val(!props.menu)}
        />
        <Typography onClick={()=>navigate(`/${user._id}`)} variant="h5" className={classes.logoLg}>
          Social Chat
        </Typography>
        <Typography onClick={()=>navigate(`/${user._id}`)} variant="h6" className={classes.logoSm}>
          Social Chat
        </Typography>
        <div className={classes.search}>
          <form style={{display:'flex',alignItems:'center',marginLeft:'10px'}} onSubmit={handleSubmit}>
          <Search/>
          <InputBase
            placeholder="Search..."
            className={classes.input}
            value={searchValue}
            // onChange={(e)=>{setSearchValue(e.target.value)}}
            onChange={searchHandler}
          ></InputBase>
          <Cancel className={classes.cancel} onClick={() => setOpen(false)} />
          </form>
        </div>
        <div className={classes.icons}>
          <Search
            className={classes.searchButton}
            onClick={() => setOpen(!open)}
          />
          <Badge onClick={()=>setOpenNotification(!openNotification)} badgeContent={notification.length} color="secondary" className={classes.badge}>
            <NotificationsActive />
          </Badge>
          {/* <Badge badgeContent={2} color="secondary" className={classes.badge}>
            <PersonAdd />
          </Badge>
          <Badge
            badgeContent={5}
            color="secondary"
            className={classes.chatBadge}
          >
            <MessageOutlined />
          </Badge> */}

          <Avatar
            onClick={handleMoreClick}
            alt="Cindy Baker"
            src={user.profilePicture?user.profilePicture:'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}
          />
        </div>
      </Toolbar>
      <Menu
        className={classes.more}
        anchorEl={anchorE1}
        keepMounted
        open={more}
        onClose={handleMoreClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={()=> navigate(`/profile/${user.username}`)}>
          <Avatar
            style={{ marginRight: 7 }}
            alt="Cindy Baker"
            src={user.profilePicture?user.profilePicture:'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}
          />{" "}
          Profile
        </MenuItem>
        <MenuItem onClick={handleMoreClose}>
          {" "}
          <FeedbackOutlined style={{ marginRight: 6 }} /> Feedback{" "}
        </MenuItem>
        
        <MenuItem onClick={logoutHandler}>
          {" "}
          <ExitToAppOutlined style={{ marginRight: 6 }} /> Logout
        </MenuItem>
      </Menu>
    </AppBar>
    <Card style={openNotification?{zIndex:90,position:'fixed',right:30,top:65,width:'19%',  display:'block',backgroundColor:'white',height:'90vh'}:{display:'block'}}>
      <div>
        <Typography style={{fontWeight:500,margin:'15px'}} variant="h5">Notification</Typography>

        {notification.map((n)=>{
          return(
            <div onClick={()=>navigate('/profile/'+n.friendName)} className={classes.notification}>
              <div style={openNotification?{display:'flex',marginTop:'10px'}:{display:'none'}}>
          <img style={openNotification?{display:'block',borderRadius:'50%',margin:'6px 5px 0 10px'}:{display:'none'}} width='30' height='30' src={n.img?n.img:'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}/>
          <div>
            <Typography style={{fontSize:16}} component="span" variant="h6">{n.friendName}</Typography>
            <Typography component='span'> {n.action}</Typography>
            <Typography style={{lineHeight:'0.6',fontSize:'12px'}}>{format(n.createdAt)}</Typography>
          </div>
        </div>
          </div>
          )
        })}
        

        
      </div>


      
    </Card>
    </>
  );
}

export default Navbar;
