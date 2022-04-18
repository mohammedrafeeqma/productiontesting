import {
  AppBar,
  Box,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  main:{
    "&:hover":{
      cursor:'pointer'
    }
  },
  navbartitle:{
    fontFamily: 'Bree Serif',
    fontSize:'28px' ,
  }
}));

function Rightbar() {
  const classes = useStyles();
  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar className={classes.main}>
          <Typography className={classes.navbartitle} variant="h5">Admin Panel</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Rightbar;
