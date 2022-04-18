import {Box, Card, makeStyles, Typography} from "@material-ui/core"
import { Delete, Remove } from "@material-ui/icons"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { listuserDetails } from "../../actions/productAction"
import FavouriteList from "./FavouriteList"

const useStyles = makeStyles((theme) => ({
    main:{
        marginTop:theme.spacing(15),
        margin:theme.spacing(5)

    },
    card:{
        display:'flex',
        justifyContent:'space-between',
        marginTop:theme.spacing(2)
    },
    title:{
        margin:theme.spacing(2),
        fontWeight:500
    },
    box:{
        display:'flex',
        marginLeft: theme.spacing(2)
    },
    postImg:{
        width:"100px",
        height:'100px'
    },
    profileImg:{
        width:'25px',
        height:'25px',
        borderRadius:'50%',
        // marginTop:theme.spacing(2)
    },
    postNametext:{
        fontWeight:600
    },
    userInfo:{
        display: 'flex',
        marginTop:theme.spacing()

    },
    info:{
        marginLeft: theme.spacing(3)
    }
}))

function Favourite() {

    const userDetails = useSelector( state => state.userDetails)
    const {loading, error, user} = userDetails
    const id = localStorage.getItem("userId");
    const[post, setPost] = useState(null)
    const[empty, setEmpty] = useState(true)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listuserDetails(id));
  }, [id, dispatch]);
  
    const classes = useStyles()
    useEffect(()=>{
        // user.favourite?.map( async(f)=>{
        //     const res = await axios.get('/api/post/'+f)
        //     console.log(res.data);
        //     post.push(res.data)
        // })
        setPost(user.favourite)
        if(post?.length===0)
        {
            setEmpty(false)
        }
        
    },[user,post])

  return (
    <div className={classes.main}>
    <Typography variant="h5" className={classes.title}>Favourite</Typography>

   
       { empty? post?.map((f)=>{

           return(
            <FavouriteList postId={f} key={f._id}/>
           )
        
       })
      : <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'50vh'}}>
          <img src="https://cdn.dribbble.com/users/1445676/screenshots/3742742/media/c1c261708442cda86a26de469e4f75a1.png?compress=1&resize=400x300" alt=""/>
          
           </div> } 
        
        
    
    
    </div>
  )
}

export default Favourite