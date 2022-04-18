import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { Close } from "@material-ui/icons";
import { Alert } from "@mui/material";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
const useStyles = makeStyles((theme) => ({
  textFieldDiv: {
    display: "flex",
  },
  textField: {
    marginLeft: theme.spacing(4),
  },
  selectInput: {
    display: "flex",
    marginTop: theme.spacing(2),
  },
  dob: {
    marginLeft: theme.spacing(2),
    width: "50%",
  },
  dialogTitle: {
    fontSize: 32,
    fontWeight: 800,
    color: "black",
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  signupButton: {
    width: "50%",
    backgroundColor: green[600],
    color: "white",
    "&:hover": {
      backgroundColor: green[800],
    },
  },
  alert:{
    marginBottom: theme.spacing(2)
  }
  
}));

function Signup({ open, setOpen }) {
  const classes = useStyles();
  const [selectDate, setSelectDate] = useState(new Date());
  const [eselectDate, seteSelectDate] = useState('');
  const [gender, setGender] = useState("");
  const [firstname, setFirstname] = useState("");
  const [efirstname, seteFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [elastname, seteLastname] = useState("");
  const [username, setUsername] = useState("");
  const [eusername, seteUsername] = useState("");
  const [email, setEmail] = useState("");
  const [eemail, seteemail] = useState("");
  const [mobile, setMobile] = useState("");
  const [emobile, seteMobile] = useState("");
  const [password, setPassword] = useState("");
  const [epassword, setePassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [ecPassword, seteCPassword] = useState("");
  const [egenders, seteGenders] = useState("");
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
     
   
    e.preventDefault();
    seteFirstname('')
    seteLastname('')
    seteUsername('')
    seteMobile('')
    setePassword('')
    seteCPassword('')
    seteSelectDate('')
    seteGenders('')
    seteemail('')
    console.log(selectDate);
    if(firstname==='')
    {
      return seteFirstname("firstname Required")
    }
    if(lastname==='')
    {
      return seteLastname("lastname required!")
    }
    if(username==='')
    {
      return seteUsername("username required!")
    }
    else if(username.length <= 6)
    {
      
      return seteUsername("username length should be min 6 letters")
    }
    if(email==='')
    {
      return seteemail("email required")
    }
    if(mobile==='')
    {
      return seteMobile("mobile required!")
    }
    else if(mobile.length!==10 || mobile >= 0== false)
    {
      
      return seteMobile("enter valid mobile number")
    }
    
    if(password==='')
    {
      return setePassword("password required!")
    }
    if(cPassword!==password)
    {
      return seteCPassword("password doesn't match")
    }
    if(gender==='' || gender==='select')
    {
      return seteGenders('please select gender')
    }
    
    let year = new Date().getFullYear()
    console.log(selectDate.getFullYear())
    console.log(year);
    if(selectDate.getFullYear()=== year)
    {

      return seteSelectDate("dob required")
    }
  

    const data = {firstname, lastname, username,email, mobile,password,selectDate, gender}
     
    try{
      let res = await axios.post('/api/auth/signup',data)
      if(res)
      {
        handleClose()
      }
    } catch({response})
    {
      console.log(response.data.keyValue);
      if(response.data.keyValue.email)
      {
        return setError(response.data.keyValue.email + " is already exists")
      }
      if(response.data.keyValue.username)
      {
        return setError(response.data.keyValue.username + ' is already exists')
      }
      if(response.data.keyValue.mobile)
      {
        return setError(response.data.keyValue.username + ' is already exists')
      }
    
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle disableTypography className={classes.dialogTitle}>
          Signup
        </DialogTitle>
        <DialogContent className={classes.dialog}>
          <DialogContentText className={classes.dialogText}>
            It's quick and easy.
          </DialogContentText>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
          {error ? <Alert className={classes.alert} severity="error">{error}</Alert> :""}
        
          <div className={classes.textFieldDiv}>
            <TextField
              
              variant="outlined"
              margin="dense"
              label="firstname"
              fullWidth
              value={firstname}
              onChange={(e)=> setFirstname(e.target.value)}
              error ={ efirstname}
              helperText={efirstname ?  'firstname required!' : ' '}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              margin="dense"
              label="lastname"
              fullWidth
              value={lastname}
              onChange={(e)=> setLastname(e.target.value)}
              error ={ elastname}
              helperText={elastname ?  'lastname required!' : ' '}
            />
          </div>
          <TextField
            variant="outlined"
            margin="dense"
            type="email"
            label="username"
            fullWidth
            value={username}
              onChange={(e)=> setUsername(e.target.value)}
              error ={ eusername}
              helperText={eusername ?  eusername : ' '}
          />
          <TextField
            variant="outlined"
            margin="dense"
            type="email"
            label="email"
            fullWidth
            value={email}
              onChange={(e)=> setEmail(e.target.value)}
              error ={ eemail}
              helperText={eemail ?  eemail : ' '}
          />
          <TextField
            variant="outlined"
            margin="dense"
            type="email"
            label="Mobile Number"
            fullWidth
            value={mobile}
              onChange={(e)=> setMobile(e.target.value)}
              error ={ emobile}
              helperText={emobile ?  emobile : ' '}
          />
          <TextField
            variant="outlined"
            margin="dense"
            type="email"
            label="Password"
            fullWidth
            value={password}
              onChange={(e)=> setPassword(e.target.value)}
              error ={ epassword}
              helperText={epassword ?  'password required!' : ' '}
          />
          <TextField
            variant="outlined"
            margin="dense"
            type="email"
            label="Confirm Password"
            fullWidth
            value={cPassword}
              onChange={(e)=> setCPassword(e.target.value)}
              error ={ ecPassword}
              helperText={ecPassword ?  ecPassword : ' '}
          />
          <div className={classes.selectInput}>
            <Stack width="50%">
              <TextField
                id="date"
                label="Date of Birth"
                type="date"
                variant="outlined"
                defaultValue={selectDate}
                // sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(date) => {
                  
                  setSelectDate( new Date(date.nativeEvent.target.value));
                }}
              error ={ eselectDate}
              helperText={eselectDate ?  eselectDate : ' '}
                
              />
            </Stack>
            <TextField
              select
              label="Gender"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={gender}
              SelectProps={{
                native: true,
              }}
              onChange={(e) => setGender(e.target.value)}
              className={classes.dob}
              error ={ egenders}
              helperText={egenders ?  egenders : ' '}
              
              
            >
              <option value="select">Select</option>
              <option value="Men">Men</option>
              <option value="women">Women</option>
              <option value="Other">Other</option>
            </TextField>
          </div>
          
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button
           onClick={handleSubmit}
            className={classes.signupButton}
            variant="contained"
          >
            Signup
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Signup;
