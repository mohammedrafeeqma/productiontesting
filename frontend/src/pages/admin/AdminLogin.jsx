import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { useEffect, useState } from "react";
import axios from "axios";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  button: {
    backgroundColor: "#0D8E8E",
    "&:hover": {
      backgroundColor: "#0D8E8f",
    },
    color: "white",
    marginTop: theme.spacing(1),
  },
  loginRegisterButton: {
    width: "75%",
    backgroundColor: green[600],
    color: "white",
    "&:hover": {
      backgroundColor: green[800],
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      fontSize: "12px",
    },
  },
  registerButtonDiv: {
    display: "flex",
    justifyContent: "center",
  },
  login: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#f0f2f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflowY: "hidden",
  },
  loginWrapper: {
    width: "70%",
    height: "70%",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  loginLeft: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  loginRight: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  loginDesc: {
    fontSize: "24px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "18px",
    },
  },
  loginLogo: {
    fontSize: "50px",
    fontWeight: 800,
    color: "#0D8E8E",
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "24px",
      fontWeight: 800,
    },
  },

  loginBox: {
    height: "250px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "spaceBetween",
  },
  textfield: {
    marginBottom: theme.spacing(3),
  },

  loginForgot: {
    textAlign: "center",
    color: "#1775ee",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

function AdminLogin() {
  useEffect(() => {
    const token = localStorage.getItem("admin");
    // const userId = localStorage.getItem("userId");
    if (token) {
      navigate(`/admin/home`);
    }
  });

  const classes = useStyles();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [uerror, setuError] = useState("");
  const [error, setError] = useState("");
  const [perror, setpError] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setuError("");
    setpError("");
    if (username.trim() === "") {
      return setuError("username Required");
    }
    if (password.trim() === "") {
      return setpError("Password required");
    }
    console.log(username);
    const data = { username, password };

    try {
      let res = await axios.post("/api/admin/login", data);

      if (res) {
        localStorage.setItem("admin", res.data.token)
        // localStorage.setItem('userId',res.data.user._id)

        navigate('/admin/home');
      }
    } catch ({ response }) {
      if (response.status) {
        console.log(response.data);
        setError(response.data);
      }
      console.log(response.status);
    }
  };

  return (
    <div className={classes.login}>
      <div className={classes.loginWrapper}>
        <div className={classes.loginLeft}>
          <Typography className={classes.loginLogo} variant="h3">
            Admin Login
          </Typography>
          <Typography className={classes.logoDesc} variant="span">
            Connect with friends and the world around you on Social Chat.
          </Typography>
        </div>
        <div className={classes.loginRight}>
          <div className={classes.loginBox}>
            <form className={classes.root}>
              {error ? (
                <Alert className={classes.alert} severity="error">
                  {error}
                </Alert>
              ) : (
                ""
              )}

              <TextField
                error={uerror}
                helperText={uerror ? "username required *" : ""}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={classes.textfield}
                label="username"
              />
              <TextField
                error={perror}
                helperText={perror ? "password required *" : ""}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={classes.textfield}
                label="password"
              />
              <Button
                onClick={handleLogin}
                className={classes.button}
                variant="contained"
                large
              >
                Login
              </Button>

              <div className={classes.registerButtonDiv}></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
