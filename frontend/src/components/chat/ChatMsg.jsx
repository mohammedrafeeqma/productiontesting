import { Button, makeStyles } from "@material-ui/core";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listuserDetails } from "../../actions/productAction";
import Message from "./Message";
import { io } from "socket.io-client";

const useStyles = makeStyles((theme) => ({
  chatBoxWrapper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    height: "100%",
  },
  chatBoxTop: {
    height: "100%",
    // overflowY: "scroll",
    paddingRight: "10px",
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "space-between",
  },
  chatBoxBottom: {
    marginTop: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

  },
  chatMessageInput: {
    width: "80%",
    height: "90px",
    padding: "10px",
  },
  chatSubmitButton: {
    width: "70px",
    height: "40px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointor",
    backgroundColor: "teal",
    color: "white",
  },
  noConversationText: {
    position: "absolute",
    top: "40%",
    fontSize: "50px",
    color: "rgb(224, 220, 220)",
    // textAlign: "center",
    cursor: "default",
  },
  chatBox:{
    backgroundImage: 'url("https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg")',
    margin:'-10px -10px 0px -50px',
    height:'90vh'
  }
}));

function ChatMsg({ currentChat, onlineUsers, setOnlineUsers }) {
  const classes = useStyles();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const dispatch = useDispatch();
  const id = localStorage.getItem("userId");
  const socket = useRef();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    dispatch(listuserDetails(id));
  }, []);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  },[]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    user && socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(user.following?.filter(f=>users.some(u=>u.userId ===f)))
    });
  }, [user]);



 
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/api//message/" + currentChat?._id);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
  const receiverId = currentChat && currentChat.members.find((member) => member !== user._id);
  currentChat &&
  socket.current.emit("sendMessage", {
    senderId: user._id,
    receiverId: receiverId,
    text: newMessage,
  });

    try {
      const res = await axios.post("/api/message/", message);
      setMessages([...messages,res.data]);
      setNewMessage('')
    } catch (error) {
      console.log(error);
    }
  }

    

  // const receiverId = currentChat ? currentChat.members[1] :''
  return (
    <>
      <div className={classes.chatBox}>
        <div className={classes.chatBoxWrapper}>
          {currentChat ? (
            <div className={classes.chatBoxTop}>
              <div style={{height:'70vh', overflowY:'scroll'}} >
                {Array.isArray(messages) && messages?.map((m) => {
                  return (
                    <Message
                      key={m._id}
                      message={m}
                      own={m.sender === user._id}
                    />
                  );
                })}
              </div>
              <div className={classes.chatBoxBottom}>
                <textarea
                  className={classes.chatMessageInput}
                  placeholder="write something..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                ></textarea>
                <Button
                  className={classes.chatSubmitButton}
                  onClick={handleSubmit}
                >
                  Send
                </Button>
              </div>
            </div>
          ) : (
            <span className={classes.noConversationText}>
              {/* Open a conversation to start a chat */}
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default ChatMsg;
