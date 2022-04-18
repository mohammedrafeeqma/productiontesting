import {Grid, makeStyles} from "@material-ui/core"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { listuserDetails } from "../../actions/productAction"
import EventLeft from "../../components/events/EventLeft"
import EventList from "../../components/events/EventList"
import Navbar from "../../components/Navbar/Navbar"

const useStyles = makeStyles((theme) => ({}))

function Events() {
    const classes = useStyles()
    const id = localStorage.getItem("userId");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listuserDetails(id));
  }, [id, dispatch]);
  return (
    <>
    <Navbar/>
    <Grid container>
        <Grid item sm={3}>
            <EventLeft/>
        </Grid>
        <Grid item sm={9}>
            <EventList/>
        </Grid>
    </Grid>
    </>
  )
}

export default Events