import { Container, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../feed/Post";
import UploadPost from "../UploadPost";
import axios from "axios";
import { listuserDetails } from "../../../actions/productAction";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    backgroundColor: theme.palette.grey[50],
  },
}));

function Feed({ username }) {
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const id = localStorage.getItem("userId");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listuserDetails(id));
  }, [id, dispatch]);
  const classes = useStyles();
  const [posts, setPosts] = useState();

  useEffect(
    () => {
      const fetchPosts = async () => {
        const res = username
          ? await axios.get("/api/post/profile/" + username)
          : await axios.get("/api/post/timeline/" + user._id);
        console.log(res.data);
        setPosts(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      };
      fetchPosts();
    },
    [user._id],
    posts
  );

  return (
    <Container className={classes.container}>
      {!username || (username == user.username && <UploadPost />)}
      {username ? "" : <UploadPost />}
      {posts?.map((p) => {
        return <Post key={p._id} post={p} />;
      })}
    </Container>
  );
}

export default Feed;
