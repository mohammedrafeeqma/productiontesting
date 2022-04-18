import { Grid, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Leftbar from "../../components/admin/Leftbar";
import Navbar from "../../components/admin/Navbar";
import Reportspage from "../../components/admin/Reportspage";
import UsersList from "../../components/admin/usersList/UsersList";
import Analystics from "../../components/admin/Analystic"

import AdminHome from "./AdminHome";
const useStyles = makeStyles((theme) => ({}));

function AdminUsers() {
  const classes = useStyles();
  const [rep, setRep] = useState(false)
  const[user, setUser] = useState(false)
  const[home, setHome] = useState(true)
  const[anal, setAnal] = useState(false)
  const{reports} = useParams()
  useEffect(()=>{
    if(reports==='reports')
    {
  
      setUser(false)
      setHome(false)
      setAnal(false)
      setRep(true)
    }
    else if(reports==='users')
    {
      setRep(false)
      setHome(false)
      setAnal(false)
      setUser(true)

    }
    else if(reports==='home')
    {
      setRep(false)
      setUser(false)
      setAnal(false)
      setHome(true)


    }
    else{
      setHome(false)
      setRep(false)
      setUser(false)
      setAnal(true)
    }
  },[rep,user,reports])
  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item sm={2} xs={12}>
          <Leftbar />
        </Grid>
        <Grid style={{marginLeft:"5%"}} item sm={8} xs={12}>
          {rep?<Reportspage/>: home? <AdminHome/> : anal? <Analystics/> : <UsersList /> }
        </Grid>
      </Grid>
    </div>
  );
}

export default AdminUsers;
