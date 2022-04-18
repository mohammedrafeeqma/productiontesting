import { Avatar, Container, makeStyles, Typography } from "@material-ui/core";
import { CallToAction, Collections, Event, ImageSearchOutlined, People } from "@material-ui/icons";
import { Tooltip } from "@mui/material";

const useStyles = makeStyles((theme) => ({
    container:{
        
        position:'sticky',
        top:0,
        paddingTop:theme.spacing(10),
        backgroundColor: theme.palette.grey[50],
        height:'100vh',
        [theme.breakpoints.down('sm')]:{

        }
    },
    item:{
        display:'flex',
        alignItems:'center',
        marginBottom:theme.spacing(4),
        '&:hover':{
          cursor:'pointer'
        }
    },
    icon:{
        marginRight:theme.spacing(1)
    },
    text:{
        fontWeight:700,
        fontSize:'18px'
    }
}));

function SearchLeft() {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <div className={classes.item}>
        <ImageSearchOutlined className={classes.icon} />
        <Typography className={classes.text}>All</Typography>
      </div>

      <div className={classes.item}>
        <People className={classes.icon} />
        <Typography className={classes.text}>People</Typography>
      </div>

      <div className={classes.item}>
        <CallToAction className={classes.icon} />
        <Tooltip title="comming soon">
        <Typography className={classes.text}>Post</Typography>
        </Tooltip>
        
      </div>

      <div className={classes.item}>
        <Collections className={classes.icon} />
        <Tooltip title="comming soon">
          <Typography className={classes.text}>Photos</Typography>
        </Tooltip>
        
      </div>

      <div className={classes.item}>
        <Event className={classes.icon} />
        <Tooltip title="comming soon">
          <Typography className={classes.text}>Events</Typography>
        </Tooltip>
        
      </div>
    </Container>
  );
}

export default SearchLeft;
