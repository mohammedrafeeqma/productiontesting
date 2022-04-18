import { Grid } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import Feed from "../../components/home/feed/Feed";
import Leftbar from "../../components/home/leftbar/Leftbar";
import Rightbar from "../../components/home/rightbar/Rightbar";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import {useParams} from 'react-router'
import Favourite from "../../components/favourite/Favourite";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";


function Home() {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const[onlineUsers, setOnlineUsers] = useState([])
  const socket = useRef();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login")
    }
  })


  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(user.following?.filter(f=>users.some(u=>u.userId ===f)))
    });
  }, []);

  


  const{favourite} = useParams()
// ! this is critical comments
// * this is a highlighted comment
// todo: this is todo comment
// ? this a question comment
// this is a normal comment
  return (
    <div className="App">
      <Navbar val={setMenu} menu={menu} />

      <Grid container>
        <Grid item sm={2} xs={12}>
          <Leftbar val={menu} />
        </Grid>
        <Grid item sm={7} xs={12}>
         {favourite? <Favourite/> :<Feed />} 
        </Grid>
        <Grid item sm={3}>
          <Rightbar onlineUsers={onlineUsers} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
