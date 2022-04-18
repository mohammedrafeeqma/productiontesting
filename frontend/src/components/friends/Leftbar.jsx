import {Container, makeStyles, Typography} from "@material-ui/core"
import { grey } from "@material-ui/core/colors";
import GroupsIcon from '@mui/icons-material/Groups';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { useNavigate } from "react-router";

const useStyles = makeStyles((theme) => ({
    container:{
        position:'sticky',
        top:0,
        paddingTop: theme.spacing(4),
        backgroundColor: theme.palette.grey[50],
        height:'100vh',
    },
    item:{
        display:'flex',
        alignItems:'center',
        marginBottom: theme.spacing(4),
        '&:hover':{
            backgroundColor:grey[200],
            cursor:'pointer'
        }
    },
    icon:{
        marginRight: theme.spacing(1)
    },
    text:{
        fontWeight: 700,
        fontSize:'20px',
        fontFamily:'Bitter'
    }
}))

function Leftbar() {
    const classes = useStyles()
    const navigate = useNavigate()
  return (
    <>
        <Container className={classes.container}>
            <div className={classes.item} onClick={()=>navigate('/friends')}>
                <GroupsIcon className={classes.icon}/>
                <Typography className={classes.text}>All Friends</Typography>
            </div>

            <div className={classes.item} onClick={()=>navigate('/friends/discovery')}>
                <TravelExploreIcon className={classes.icon}/>
                <Typography className={classes.text}>Discovery</Typography>
            </div>

            <div className={classes.item} onClick={()=>navigate('/friends/sugested')}>
                <TravelExploreIcon className={classes.icon}/>
                <Typography className={classes.text}>Sugested</Typography>
            </div>
        </Container>
    </>
  )
}

export default Leftbar