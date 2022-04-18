import {Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, Typography} from "@material-ui/core"
import { useNavigate, useParams } from "react-router"
import moment from 'moment'
import { grey } from "@material-ui/core/colors"
import axios from "axios"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Delete, StarOutlined, StarOutlineOutlined } from "@material-ui/icons"


const useStyles = makeStyles((theme) => ({
    card:{
        margin:theme.spacing(1),
        width:'31%',
        position:'relative'
        
    },
    main:{
        marginTop: theme.spacing(15),
        margin: theme.spacing(10)
    },
    mainDiv:{
        backgroundColor:grey[50],
        display:'flex',
        justifyContent:'start',
        flexWrap:'wrap'
    },
    cardContent:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    
    },
    mainText:{
        fontSize:'18px'
    },
    datetext:{
      fontWeight:600
    },
    addresstext:{
      fontWeight:500,
      color:'#696969',

    },
    interesttext:{
      color:'grey'
    },
    followButton:{
        marginTop:theme.spacing(1),
        backgroundColor:'#0D8E8E',
        color:'white'
    },
    kmtext:{
        fontWeight:600,
        color:'#0D8E8E'
        
    },
    starLogo:{
     color:'yellow'
    }
}))

function EventListCard({refresh,setRefresh, f,long,latt}) {
    const userDetails = useSelector( state => state.userDetails)
    const{loading,error, user} = userDetails
    const classes = useStyles()
    const navigate = useNavigate()
    const[liked, setLiked] = useState()
    const[owner,setOwner] = useState(false)
    const[confirm, setConfirm] = useState(false)
    const[interested, setInterseted] = useState(false)

    useEffect(()=>{
      setOwner(user._id===f.ownerId)
    })
useEffect(()=>{
  const like = f.interested.includes(user._id)
  setInterseted(like)
  setLiked(like)
})
    function distance(lat1,
        lat2, lon1, lon2)
  {
  
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  lon1 =  lon1 * Math.PI / 180;
  lon2 = lon2 * Math.PI / 180;
  lat1 = lat1 * Math.PI / 180;
  lat2 = lat2 * Math.PI / 180;
  
  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a = Math.pow(Math.sin(dlat / 2), 2)
    + Math.cos(lat1) * Math.cos(lat2)
    * Math.pow(Math.sin(dlon / 2),2);
  
  let c = 2 * Math.asin(Math.sqrt(a));
  
  // Radius of earth in kilometers. Use 3956
  // for miles
  let r = 6371;
  
  // calculate the result
  return(c * r);
  }
  const interestedHandler = ()=>{
      try {
          axios.put('/api/event/'+f._id+'/interest',{userId:user?._id})
          
          setRefresh(!refresh)
      } catch (error) {
          
      }
      setLiked(!liked)
  }
  
  const km = distance(f.loc.coordinates[0],latt, f.loc.coordinates[1],long).toFixed(1)
  
  const deleteConfirm = ()=>{
    setConfirm(true)
  }

  const deleteEvent= async(eventId)=>{
    try {
      const res = await axios.delete('/api/event/'+eventId)
      if(res.data)
      {
          setRefresh(true)
          setConfirm(false)
      }
  } catch (error) {
    alert(error)

      
  }
  setInterseted(!interested)

  }

  return (
    <>
        <Card className={classes.card}>
          {owner?<div style={{position:'absolute',top:150,right:10,zIndex:4}}>
            <Delete onClick={deleteConfirm} style={{color:'grey'}}/>
          </div>:''}
          
          <CardMedia
          className={classes.cardImage}
          component='img'
          height='140'
          image={f.img}

          />
          <CardContent className={classes.CardContent}>
          <Typography className={classes.datetext} variant="p" component='div'>{moment(f.date).add('days').calendar()}</Typography>
          <Typography className={classes.kmtext} variant="p" component='div'>{km}km</Typography>
          <Typography className={classes.mainText} variant="h5" component="div">{f.eventName}</Typography>
          <Typography className={classes.addresstext} variant="p" component='div'>{f.address}</Typography>
            <Typography className={classes.interesttext} variant="p" component='div'>{f.interested.length} interested</Typography>
            {interested?
            <Button onClick={interestedHandler} className={classes.followButton} variant="contained"> <StarOutlined className={classes.starLogo}/> Interested</Button>
            : <Button onClick={interestedHandler} variant="contained"> <StarOutlined style={{color:'white'}}/> interested</Button> }
          </CardContent>
        </Card>


        {/* confim modal */}
        <Dialog open={confirm} onClose={()=>setConfirm(false)}>
        <DialogTitle style={{fontWeight:700}}>
            Delete?
        </DialogTitle>
        <hr/>
        <DialogContent>
        Items that you delete can't be restored.
        </DialogContent>
        <DialogActions>
            <Button onClick={()=>deleteEvent(f._id)} variant="contained" style={{color:'white', backgroundColor:'#0D8E8E'}}>Delete</Button>
            <Button variant="contained" onClick={()=>setConfirm(false)} style={{color:'#0D8E8E', backgroundColor:'white'}}>Cancel</Button>
        </DialogActions>

    </Dialog>
    </>
  )
}

export default EventListCard