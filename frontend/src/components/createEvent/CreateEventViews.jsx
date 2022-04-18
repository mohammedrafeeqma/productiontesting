import {Box, Card, makeStyles, Typography} from "@material-ui/core"
const moment = require('moment')
const useStyles = makeStyles((theme) => ({
  dateBox:{
    height:'45px',
    backgroundColor:'white',
    width:'5%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    border:'1px solid grey',
    marginBottom: theme.spacing(2)
  },
  dateText:{
    fontSize:'21px',
    fontWeight:700
  },
  dateBoxHeader:{
    backgroundColor:'red',
    height:'10px',
    width:'5%',
    border:'1px solid grey'
  },
  dateBoxDiv:{
    margin: theme.spacing(4),
  },
  mainCard:{
    height:'80vh'
  },
  subCard:{
    margin: theme.spacing(3)
  },
  eventName:{
    color: '#aba7a7',
    fontWeight:700,
    marginTop: theme.spacing(1)
    
  },
  locationText:{
    color:'#aba7a7',

  },
  header:{
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(1),
    fontWeight:700
  }
}))

function CreateEventViews({eventName, value, address}) {
    const classes = useStyles()
  //  let date = JSON.stringify(value)
  return (
    <div style={{marginTop:'10%'}}>
      <Card className={classes.mainCard}>
        <Typography variant="h5" className={classes.header}>Event Details</Typography>
        <Card className={classes.subCard}>
          <div className={classes.dateBoxDiv}>
            <Box className={classes.dateBoxHeader}>

            </Box>
            <Box className={classes.dateBox}>
              <Typography className={classes.dateText}>{moment(value).format('Do')}</Typography>
            </Box>
            <div>
            <Typography variant="p" color="secondary">{moment(value).format('LLLL')}</Typography>
            <Typography className={classes.eventName} variant="h5">{eventName? eventName: 'Event Name'}</Typography>
            <Typography className={classes.locationText} variant="h6">{address? address : 'Location'}</Typography>
            </div>
          </div>
        </Card>

      </Card>
    </div>
  )
}

export default CreateEventViews