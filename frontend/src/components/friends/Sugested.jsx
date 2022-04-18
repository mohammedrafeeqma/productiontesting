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

function Sugested() {
    const classes = useStyles()
    const userDetails = useSelector( state => state.userDetails)
    const {loading, error, user} = userDetails
    const dispatch = useDispatch()
    const id = localStorage.getItem('userId')
    const[freinds, setFriends] = useState([])
    const[randomNumber, setRandomNumber] = useState(0)
    const[randomNumber1, setRandomNumber1] = useState(0)
    const[randomNumber2, setRandomNumber2] = useState(0)
    const[randomNumber3, setRandomNumber3] = useState(0)
    const[randomNumber4, setRandomNumber4] = useState(0)
    const[randomNumber5, setRandomNumber5] = useState(0)

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

    const navigate = useNavigate()
    useEffect(()=>{
        dispatch(listuserDetails(id));
    },[id, dispatch])
    useEffect(()=>{
        const fetchFriends = async()=>{
            const res = await axios.get('/api/user/usersList')
            console.log(res.data)   
            setFriends(res.data)
        }
        fetchFriends()
    },[user._id])

    console.log(freinds[randomNumber]?.username);
  return (
      <div className={classes.main}>
      <Typography style={{marginLeft:'10px',fontWeight:600,fontFamily:'Bitter'}} variant="h5">Sugested</Typography>
    <div className={classes.mainDiv}> 
    

            <Card className={classes.card}>
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



        <Card className={classes.card}>
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


        <Card className={classes.card}>
        <CardMedia
        className={classes.cardImage}
        component="img"
        height='140'
        image={freinds[randomNumber2]?.profilePicture? freinds[randomNumber2]?.profilePicture :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuSMA98U5nhBmtcdj2hmFD4ijUIue_fCxNWw&usqp=CAU'}
        >

        </CardMedia>
        <CardContent className={classes.cardContent}>
            <Typography className={classes.mainText} variant="h5" component="div">{freinds[randomNumber2]?.username}</Typography>
            <Typography className={classes.text} variant="p" component='div'>1 mutual Friends</Typography>
            <Button onClick={()=>navigate('/profile/'+freinds[randomNumber2]?.username)} className={classes.followButton} variant="contained">View Profile</Button>
        </CardContent>
        </Card>



        <Card className={classes.card}>
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
  )
}

export default Sugested