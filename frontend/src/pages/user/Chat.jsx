import { Grid, makeStyles } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listuserDetails } from "../../actions/productAction";
import ChatLeft from "../../components/chat/ChatLeft";
import ChatMsg from "../../components/chat/ChatMsg";
import ChatRight from "../../components/chat/ChatRight";
import Navbar from "../../components/Navbar/Navbar";

const useStyles = makeStyles((theme) => ({}));

function Chat() {
  const classes = useStyles();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const [conversations, setConversations] = useState([]);
  const[currentChat, setCurrentChat] = useState('')
  const [onlineUsers, setOnlineUsers] = useState([])
  const id = localStorage.getItem("userId");
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(listuserDetails(id));
  }, []);



  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get("/api/conversation/" + user?._id);
        setConversations(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getConversation()
  },[]);

  
  return (
    <>
      <Navbar />
      <Grid container>
        <Grid item sm={2}>
          <ChatLeft conversations={conversations} currentChat={currentChat} setCurrentChat={setCurrentChat} />
        </Grid>
        <Grid item sm={7}>
          <ChatMsg onlineUsers={onlineUsers} setOnlineUsers={setOnlineUsers} setCurrentChat={setCurrentChat} currentChat={currentChat} />
        </Grid>
        <Grid item sm={3}>
          <ChatRight onlineUsers={onlineUsers} />
        </Grid>
      </Grid>
    </>
  );
}

export default Chat;
