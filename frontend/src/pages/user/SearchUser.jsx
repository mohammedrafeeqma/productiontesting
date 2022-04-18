import {Grid, makeStyles} from "@material-ui/core"
import Navbar from "../../components/Navbar/Navbar"
import SearchLeft from "../../components/search/SearchLeft"
import All from '../../components/search/All'

const useStyles = makeStyles((theme) => ({}))

function SearchUser(){
    const classes = useStyles()
  return (
    <>
    <Navbar/>
    <Grid container>
        <Grid item sm={2}>
          <SearchLeft/>
        </Grid>
        <Grid item sm={10}>
            <All/>
        </Grid>
    </Grid>
    
    </>
  )
}

export default SearchUser