import {Grid, makeStyles} from "@material-ui/core"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { listuserDetails } from "../../actions/productAction"
import CreateEventLeft from "../../components/createEvent/CreateEventLeft"
import CreateEventViews from "../../components/createEvent/CreateEventViews"
import Navbar from "../../components/Navbar/Navbar"

const useStyles = makeStyles((theme) => ({}))

function CreateEvent() {
    const classes = useStyles()
    const userDetails = useSelector( state => state.userDetails)
    const {loading, error, user} = userDetails
    const[value, setValue] = useState(new Date())
    const[eventName, setEventName] = useState('')
    const [address,setAddress] = useState('')
    const[description, setDescription] = useState('')
    const dispatch = useDispatch()
    const id = localStorage.getItem('userId')
    useEffect(()=>{
        dispatch(listuserDetails(id));
    },[id, dispatch])

  return (
    <>
    <Navbar/>
    <Grid container>
        <Grid item sm={3}>
            <CreateEventLeft description={description} setDescription={setDescription} address={address} setAddress={setAddress} value={value} setValue={setValue} eventName={eventName} setEventName={setEventName} />
        </Grid>
        <Grid item sm={9}>
            <CreateEventViews address={address} value={value} eventName={eventName}/>
        </Grid>
    </Grid>
    </>
  )
}

export default CreateEvent