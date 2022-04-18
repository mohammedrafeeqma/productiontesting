import {Button, Card, makeStyles, Typography} from "@material-ui/core"
import axios from "axios"
import { useEffect, useState } from "react"
import ReportspageList from "./ReportspageList"

const useStyles = makeStyles((theme) => ({
  main:{
    marginTop: theme.spacing(15),
  },
  card:{
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center'
  },
  postImg:{
    height:'80px',
    width:'80px'
  },
  postDetails:{
    display:'flex'
  }
}))

function Reportspage() {
    const classes = useStyles()
    const[posts, setPosts] = useState()

    useEffect(()=>{
      const fetchPost = async ()=>{
        const res = await axios.get('/api/post/all')
        setPosts(res.data)
      }
      fetchPost()
    },[])
  return (
    <div className={classes.main}>

      {posts?.map((p)=>{
        return(
          <ReportspageList key={p._id} post={p}/>
        )
      })}
      


      
    </div>
  )
}

export default Reportspage