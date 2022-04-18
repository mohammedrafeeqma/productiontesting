import {Box, Card, Container, makeStyles, Typography} from "@material-ui/core"
import { Delete, EmailOutlined, ForumOutlined, GpsNotFixedOutlined, PeopleAltOutlined, ReportOutlined } from "@material-ui/icons"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router";
import { io } from "socket.io-client";
import { format } from "timeago.js";


const useStyles = makeStyles((theme) => ({
    card1:{
        display:'flex',
        height:'15vh',
        width:'20%',
        alignItems:'center',
        justifyContent:'space-evenly',
        background: 'rgb(2,0,36)',
        background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)', 
    },
    card2:{
        display:'flex',
        height:'15vh',
        width:'20%',
        alignItems:'center',
        justifyContent:'space-evenly',
        backgroundImage: 'linear-gradient(to right, #DECBA4, #3E5151)',
    },
    card3:{
        display:'flex',
        height:'15vh',
        width:'20%',
        alignItems:'center',
        justifyContent:'space-evenly',
        backgroundImage: 'linear-gradient( 109.6deg, rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1% )',
        
    },
    card4:{
        display:'flex',
        height:'15vh',
        width:'20%',
        alignItems:'center',
        justifyContent:'space-evenly',
        backgroundImage: 'radial-gradient(circle farthest-side, #fceabb, #f8b500)',

        
    },
    userIcon:{
        fontSize:'44px'
    }
}))

function AdminHome() {
    const classes = useStyles()
    const[totalUser, setTotalUser] = useState()
    const[message, setMessage] = useState()
    const[comment, setComment] = useState()
    const[onlineUsers, setOnlineUsers] = useState(1)
    const[newUser, setNewUser] = useState([])
    const[topfollower, setTopfollower] = useState([])
    const[topLikes, setTopLikes] = useState([])
    const[allUser, setAllUser] = useState([])
    const[topLikedDetails, setTopLikedDetails] = useState()
    const navigate = useNavigate()
  const socket = useRef();

 
  useEffect(()=>{
      const token = localStorage.getItem('admin');
      if(!token)
      {
          navigate('/admin')
      }

  })

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.emit("addUser", '886868');
        socket.current.on("getUsers", (users) => {
          setOnlineUsers(users.length)
        });
      });
      useEffect(async () => {
        try {
          const users = await axios.get("/api/admin/usersList");
          setAllUser(users.data)
        } catch (error) {}
      },[]);

    useEffect(async () => {
        try {
          const users = await axios.get("/api/admin/usersList");
          setTotalUser(users.data.length)
        } catch (error) {}
      },[]);

      useEffect(async()=>{
          try {
              const message = await axios.get('/api/message/');
              setMessage(message.data)
          } catch (error) {
              
          }
      },[])

      useEffect(async()=>{
          try {
              const comment = await axios.get('/api/post/comment/')
              setComment(comment.data)
          } catch (error) {
              
          }
      },[])

      useEffect(async()=>{
          try {
              const res = await axios.get('/api/admin/newUser/')
              setNewUser(res.data)
          } catch (error) {
              
          }
      },[])

      useEffect(async()=>{
        try {
            const res = await axios.get('/api/admin/topfollower/')
            setTopfollower(res.data)
        } catch (error) {
            
        }
    },[])

    useEffect(async()=>{
        try {
            const res = await axios.get('/api/admin/toplikes/')
            setTopLikes(res.data)
        } catch (error) {
            
        }
    },[])

    useEffect(()=>{
        setTopLikedDetails(allUser?.filter((u)=> topLikes?.includes(u._id)))
    },[])
    console.log(topLikes);



  return (
    <>
    <div style={{marginTop:'10%', width:'100%',display:'flex', justifyContent:'space-between'}}>
        <Card className={classes.card1}>
            <div>
                 <Typography style={{fontWeight:600, color:'white'}} variant="h4">{totalUser}</Typography>
                 <Typography style={{color:'white'}} variant="h6">Total Users</Typography>
            </div>
            <div>
                <PeopleAltOutlined className={classes.userIcon}/>
            </div>
        </Card>

        <Card className={classes.card2}>
            <div>
                 <Typography style={{fontWeight:600, color:'white'}} variant="h4">{message}</Typography>
                 <Typography style={{color:'white'}} variant="h6">Total Messages</Typography>
            </div>
            <div>
                <EmailOutlined className={classes.userIcon}/>
            </div>
        </Card>

        <Card className={classes.card3}>
            <div>
                 <Typography style={{fontWeight:600, color:'white'}} variant="h4">{comment}</Typography>
                 <Typography style={{color:'white'}} variant="h6">Total Comments</Typography>
            </div>
            <div>
                <ForumOutlined className={classes.userIcon}/>
            </div>
        </Card>

        <Card className={classes.card4}>
            <div>
                 <Typography style={{fontWeight:600, color:'white'}} variant="h4">{onlineUsers-1}</Typography>
                 <Typography style={{color:'white'}} variant="h6">Online users</Typography>
            </div>
            <div>
                <GpsNotFixedOutlined className={classes.userIcon}/>
            </div>
        </Card>
    </div>

    <div style={{marginTop:'5%', display:'flex', justifyContent:'space-between'}}>
        <Card style={{height:'50vh', width:'25%'}}>
            <div style={{textAlign:'center',margin:'10px 0 20px'}}>
            <Typography style={{fontWeight:600,fontFamily:'vollkorn'}} variant="h5">New join members</Typography>
            </div>
            {newUser.map((u)=>{
                return(
                    <div style={{display:'flex', alignItems:'center',margin:'0 0 10px 20px'}}>
                <div> <img height='40' width='40' style={{borderRadius:'50%'}} src={u.profilePicture?u.profilePicture:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgOum8r1wH4vte2O8g9f3RVuFY4h750UDELvzHXPM_67S228-eiTy54Qo4MASiW--w2qg&usqp=CAU'}/> </div>
                <div style={{marginLeft:'8px'}}>
                    <Typography style={{fontFamily:'vollkorn'}} variant="h6">{u.username}</Typography>
                </div>
            </div>
                )
            })}
            

        </Card>

        <Card style={{height:'50vh', width:'27%'}}>
            <div style={{textAlign:'center',margin:'8px 0 0 20px'}}>
            <Typography style={{fontWeight:600, fontFamily:'vollkorn'}} variant="h5">Top followers members</Typography>
            </div>

            {topfollower.map((f)=>{
                return(
                   <div style={{display:'flex', alignItems:'center',margin:'0 0 10px 20px'}}>
                <div> <img height='40' width='40' style={{borderRadius:'50%'}} src={f.details[0].profilePicture?f.details[0].profilePicture:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgOum8r1wH4vte2O8g9f3RVuFY4h750UDELvzHXPM_67S228-eiTy54Qo4MASiW--w2qg&usqp=CAU"}/> </div>
                <div style={{marginLeft:'8px'}}>
                    <Typography style={{fontFamily:'vollkorn'}} variant="h6">{f.details[0].username}</Typography>
                    <Typography variant="p">{f.count} followers</Typography>
                </div>
            </div> 
                )
            })}
            

        
        </Card>


        <Card style={{height:'50vh', width:'25%'}}>
            <div style={{textAlign:'center',margin:'10px 0 20px'}}>
            <Typography style={{fontWeight:600,fontFamily:'vollkorn'}} variant="h5">Top Liked Post</Typography>
            </div>
            {topLikes.map((l)=>{
                return(
                    <div style={{display:'flex', alignItems:'center',margin:'0 0 10px 20px'}}>
                <div> <img height='40' width='40' style={{borderRadius:'50%'}} src={l.details[0].img}/> </div>
                <div style={{marginLeft:'8px'}}>
                    <Typography variant="p" component='div'>{format(l.details[0].createdAt)}</Typography>
                    <Typography variant="p">{l.count} likes</Typography>

                </div>
            </div>
                )
            })}
            


        </Card>



        
    </div>
    </>
  )
}

export default AdminHome