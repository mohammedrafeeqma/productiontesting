import { Container, makeStyles, Typography } from "@material-ui/core";
import { BarChartOutlined, ReportOutlined, WidgetsOutlined } from "@material-ui/icons";
import Groups from "@mui/icons-material/Groups";
import { useNavigate } from "react-router";
import LogoutOutlined from '@mui/icons-material/LogoutOutlined'

const useStyles = makeStyles((theme) => ({
  container: {
    position: "sticky",
    top: 0,
    paddingTop: theme.spacing(10),
    backgroundColor: theme.palette.grey[50],
    height: "100vh",
    [theme.breakpoints.down("sm")]: {
      position: "fixed",
      display: (props) => (props.val ? "block" : "none"),
      backgroundColor: "#0D8E8f",
      color: "white",
      zIndex: 10,
    },
  },
  item: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(3),
      cursor: "pointer",
    },
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  text: {
    
    fontWeight: 700,
    fontSize: "20px",
    fontFamily:'Bitter'
  },
}));

function Leftbar() {
  const classes = useStyles();
  const navigate = useNavigate()

  const logoutHandler = ()=>{
    localStorage.removeItem('admin')
    navigate('/admin')
  }
  return (
    <Container className={classes.container}>
      <div onClick={()=>navigate('/admin/home')} className={classes.item}>
        <WidgetsOutlined className={classes.icon} />
        <Typography className={classes.text}>Home</Typography>
      </div>
      <div onClick={()=>navigate('/admin/users')} className={classes.item}>
        <Groups className={classes.icon} />
        <Typography className={classes.text}>Users</Typography>
      </div>
      <div onClick={()=>navigate('/admin/reports')} className={classes.item}>
        <ReportOutlined className={classes.icon} />
        <Typography className={classes.text}>Reports</Typography>
      </div>
      <div onClick={()=>navigate('/admin/analystic')} className={classes.item}>
        <BarChartOutlined className={classes.icon} />
        <Typography className={classes.text}>Analytics</Typography>
      </div>
      <div onClick={logoutHandler} className={classes.item}>
        <LogoutOutlined className={classes.icon} />
        <Typography className={classes.text}>Logout</Typography>
      </div>
      
    </Container>
  );
}

export default Leftbar;
