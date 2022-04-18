import {Button, Card, CardContent, CardMedia, makeStyles, Typography} from "@material-ui/core"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { listuserDetails } from "../../actions/productAction"

const useStyles = makeStyles((theme) => ({
    card:{
        margin:theme.spacing(1),
        width:'15%'
        
    },
    main:{
        marginTop: theme.spacing(4),
    },
    mainDiv:{
        display:'flex',
        justifyContent:'baseline',
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
}))

function Discovery() {
    const classes = useStyles()
    const userDetails = useSelector( state => state.userDetails)
    const {loading, error, user} = userDetails
    const dispatch = useDispatch()
    const id = localStorage.getItem('userId')
    const[freinds, setFriends] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        dispatch(listuserDetails(id));
    },[id, dispatch])
    useEffect(()=>{
        const fetchFriends = async()=>{
            const res = await axios.get('/api/user/usersList')
            console.log(res.data);
            setFriends(res.data)
        }
        fetchFriends()
    },[user._id])
  return (
      <div className={classes.main}>
      <Typography style={{marginLeft:'10px',fontWeight:600,fontFamily:'Bitter'}} variant="h5">Discovery</Typography>
    <div className={classes.mainDiv}> 
    {freinds?.map((f)=>{
        return(

            <Card key={f._id} className={classes.card}>
        <CardMedia
        className={classes.cardImage}
        component="img"
        height='140'
        image={f.profilePicture? f.profilePicture :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuSMA98U5nhBmtcdj2hmFD4ijUIue_fCxNWw&usqp=CAU'}
        >

        </CardMedia>
        <CardContent className={classes.cardContent}>
            <Typography className={classes.mainText} variant="h5" component="div">{f.username}</Typography>
            <Typography className={classes.text} variant="p" component='div'>10 mutual Friends</Typography>
            <Button onClick={()=>navigate('/profile/'+f.username)} className={classes.followButton} variant="contained">View Profile</Button>
        </CardContent>
    </Card>

        )
    })} 
    


    </div>
    </div>
  )
}

export default Discovery