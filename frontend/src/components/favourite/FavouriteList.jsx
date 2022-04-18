import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Close, Delete, Remove } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listuserDetails } from "../../actions/productAction";
import PostView from "../home/feed/PostView";
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(15),
    margin: theme.spacing(5),
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    fontWeight: 500,
  },
  box: {
    display: "flex",
    marginLeft: theme.spacing(2),
  },
  postImg: {
    width: "100px",
    height: "100px",
  },
  profileImg: {
    width: "25px",
    height: "25px",
    borderRadius: "50%",
    // marginTop:theme.spacing(2)
  },
  postNametext: {
    fontWeight: 600,
  },
  userInfo: {
    display: "flex",
    marginTop: theme.spacing(),
  },
  info: {
    marginLeft: theme.spacing(3),
  },
}));

function FavouriteList({ postId }) {
  console.log(postId);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const [post, setPost] = useState("");
  const [postOwner, setPostOwner] = useState("");
  const [confirm, setConfirm] = useState("");
  const[refresh, setRefresh] = useState(false)
  const[openPost, setOpenPost] = useState(false)

  const classes = useStyles();
  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get("/api/post/" + postId);
      setPost(res.data);
    };
    fetchPost();
  }, [user,refresh]);

  useEffect(() => {
    const postOwnerFetch = async () => {
      const res = await axios.post("/api/user/", { userId: post.userId });
      setPostOwner(res.data);
    };
    postOwnerFetch();
  }, [post, refresh]);

  const deleteHandle = async () => {
    const res = await axios.put("/api/post/" + post._id + "/favourite", {
      userId: user._id,
    });
    setRefresh(!refresh)
    setConfirm(false);
  };
  const deleteConfirm = async () => {
    setConfirm(true);
  };

  return (
    <>
    <Dialog style={{padding:'80px', paddingTop:'20px'}} fullWidth open={openPost} onClose={()=>setOpenPost(false)}>
      <Close style={{position:'absolute', right:8, top:8}} onClick={()=>setOpenPost(false)}/>
        <div style={{margin:'20px'}}>
          <PostView post={post}/>
        </div>
    </Dialog>
      <Card className={classes.card}>
        <div>
          <Box className={classes.box}>
            <div>
              <img onClick={()=>setOpenPost(true)} className={classes.postImg} src={post.img} alt="" />
            </div>
            <div className={classes.info}>
              <Typography className={classes.postNametext}>
                {moment(post.createdAt).format('LLLL')}
              </Typography>
              <div className={classes.userInfo}>
                <img
                  className={classes.profileImg}
                  src={postOwner?postOwner.profilePicture:'https://www.kindpng.com/picc/m/207-2074624_white-gray-circle-avatar-png-transparent-png.png'}
                  alt=""
                  
                />
                <Typography style={{ marginLeft: "5px" }} component="span">
                  saved from{" "}
                </Typography>{" "}
                &nbsp;
                <Typography style={{ fontWeight: 600 }} component="span">
                  {postOwner?.username}'s Post
                </Typography>
              </div>
            </div>
          </Box>
        </div>
        <div onClick={deleteConfirm}>
          <Delete style={{ margin: "10px", color: "#0D8E8E" }} />
        </div>

        <Dialog open={confirm} onClose={() => setConfirm(false)}>
          <DialogTitle style={{ fontWeight: 700 }}>Delete?</DialogTitle>
          <hr />
          <DialogContent>
            Do you want to delete item from Favourite
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => deleteHandle()}
              variant="contained"
              style={{ color: "white", backgroundColor: "#0D8E8E" }}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              onClick={() => setConfirm(false)}
              style={{ color: "#0D8E8E", backgroundColor: "white" }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </>
  );
}

export default FavouriteList;
