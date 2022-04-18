import {makeStyles} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  
}))

function Sample() {
    const classes = useStyles()  
  return (
    <div className='image'>
      <h1>hellow wooee</h1>
      <img height='300' width='500' src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300" alt="nothing"/>
    </div>
  )
}

export default Sample