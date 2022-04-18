import {Button, Container, makeStyles, Typography} from "@material-ui/core"
import { BorderAll, EventAvailable } from "@material-ui/icons"
import { useNavigate } from "react-router"

const useStyles = makeStyles((theme) => ({
    container:{
        position:'sticky',
        top:0,
        paddingTop:theme.spacing(10),
        backgroundColor: theme.palette.grey[50],
        height:'100vh'
    },
    item:{
        display:'flex',
        alignItems:'center',
        marginBottom: theme.spacing(4),
        "&:hover":{
            cursor:'pointer'
        }
    },
    icon:{
        marginRight: theme.spacing(1)
    },
    text:{
        fontWeight: 900,
        fontSize:'20px'
    },
    buttonDiv:{
        textAlign:'center',
        
    },
    createButton:{
        backgroundColor:'green',
        color:'white',
        "&:hover":{
            backgroundColor:'green'
        }
    }
}))

function EventLeft() {
    const classes = useStyles()
    const navigate = useNavigate()
  return (
    <>
    <Container className={classes.container}>
        <div onClick={()=>navigate('/events/all')} className={classes.item}>
            <BorderAll className={classes.icon}/>
            <Typography className={classes.text}>All Events</Typography>
        </div>

        <div onClick={()=>navigate('/events/yourevents')} className={classes.item}>
            <EventAvailable className={classes.icon}/>
            <Typography className={classes.text}>your Events</Typography>
        </div>
        <div onClick={()=>navigate('/events/nearby')} className={classes.item}>
            <EventAvailable className={classes.icon}/>
            <Typography className={classes.text}>Nearest Events</Typography>
        </div>
        <div className={classes.buttonDiv}>
            <Button onClick={()=>navigate('/createevents')} className={classes.createButton} variant="contained">Create New Event</Button>
        </div>
        

    </Container>
    </>
  )
}

export default EventLeft