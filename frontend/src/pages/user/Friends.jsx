import {Grid, makeStyles} from "@material-ui/core"
import { set } from "date-fns/esm"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import AllFriends from "../../components/friends/AllFriends"
import Discovery from "../../components/friends/Discovery"
import Leftbar from "../../components/friends/Leftbar"
import Sugested from "../../components/friends/Sugested"
import Navbar from "../../components/Navbar/Navbar"

const useStyles = makeStyles((theme) => ({}))

function Friends() {
    const classes = useStyles()
    const[discover, setDiscover] = useState(false)
    const[dis, setDis] = useState(false)
    const[sug, setSug] = useState(false)
    const {discovery,suggested} = useParams()
    useEffect(()=>{
      if(discovery==='sugested')
    {
      setDis(false)
      setDiscover(false)
      setSug(true)

    }
    else if(discovery==='discovery')
    {
      setSug(false)
      setDiscover(false)
      setDis(true)

    }
    else{
      setDis(false)
      setSug(false)
      setDiscover(true)
    }
    
    })
  return (
    <>
    <Navbar/>
    <Grid container>
        <Grid item sm={2}>
            <Leftbar/>
        </Grid>
        <Grid item sm={10}>
            {dis? <Discovery/> : sug? <Sugested/> :  <AllFriends/>}
        </Grid>
    </Grid>
    </>
  )
}

export default Friends