import {Avatar, Container, makeStyles, Typography} from "@material-ui/core"
import { ChatOutlined, EventOutlined, FolderSpecialOutlined, GroupSharp, Home, PeopleAltOutlined } from "@material-ui/icons"
import {useSelector} from 'react-redux'
import { useNavigate } from "react-router"
const useStyles = makeStyles((theme) => ({
    container:{
        position:"sticky",
        top:0,
        paddingTop: theme.spacing(1),
        backgroundColor: theme.palette.grey[50],
        height: "100vh",
        [theme.breakpoints.down('sm')]: {
            position:"fixed",
            display:(props) => props.val ? "block" : "none",
            backgroundColor:"#0D8E8f",
            color:"white",
            zIndex:10
        }
    },
    item:{
        display:"flex",
        alignItems:"center",
        marginBottom: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
            marginBottom: theme.spacing(3),
            cursor:"pointer"
        }
    },
    icon:{
        marginRight: theme.spacing(1)

    },
    text:{
        fontWeight: 900,
        fontSize: "20px",
        fontFamily:'Bitter'
    }
}))

function Leftbar(props) {
    const classes = useStyles({val:props.val})
    const navigate = useNavigate()


    const userDetails = useSelector( state => state.userDetails)
    const{ loading, error, user} = userDetails
  return (
    <Container className={classes.container}>
        <div className={classes.item}>
            <Avatar className={classes.icon} alt="Cindy Baker" src={user.profilePicture? user.profilePicture : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'} />
            <Typography className={classes.text}>{user.username}</Typography>
        </div>
        <div className={classes.item} onClick={()=>navigate('/chat')}>
            <ChatOutlined className={classes.icon}/>
            <Typography className={classes.text}>Chat</Typography>
        </div>
        <div className={classes.item} onClick={()=>navigate('/friends')}>
            <PeopleAltOutlined className={classes.icon}/>
            <Typography className={classes.text}>Friends</Typography>
        </div>
        <div onClick={()=>navigate(`/${user._id}/favourite`)} className={classes.item}>
            <FolderSpecialOutlined className={classes.icon}/>
            <Typography className={classes.text}>Favourites</Typography>
        </div>
        {/* <div className={classes.item}>
            <GroupSharp className={classes.icon}/>
            <Typography className={classes.text}>Groups</Typography>
        </div> */}
        <div className={classes.item} onClick={()=>navigate('/events/all')}>
            <EventOutlined className={classes.icon}/>
            <Typography className={classes.text}>Events</Typography>
        </div>
    </Container>
  )
}

export default Leftbar