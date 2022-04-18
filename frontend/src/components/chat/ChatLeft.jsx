import {Container, makeStyles} from "@material-ui/core"
import { grey } from "@material-ui/core/colors"
import Conv from "./Conv"

const useStyles = makeStyles((theme) => ({
    mainDiv:{
        backgroundColor: theme.palette.grey[50],
        height:'100vh',
        position:'fixed',
        marginTop:theme.spacing(1),
    },
    conversation:{
        display:'flex',
        alignItems:'center',
        padding:'10px',
        cursor:'pointer',
        marginTop:'10px',
    },
    conversationImg:{
        width:'40px',
        height:'40px',
        borderRadius:'50%',
        objectFit:'cover',
        marginRight:'20px'
    },
    conversationName:{
        fontWeight:500
    },
    searchInput:{
        marginTop:theme.spacing(15),
        marginLeft: theme.spacing(5),
        width: '80%',
        border: 'none',
        borderBottom: '1px solid gray'
    },
    eachDiv:{
        '&:hover':{
            backgroundColor:grey[100]
        }
    }
}))

function ChatLeft({conversations, setCurrentChat, currentChat}) {
    const classes = useStyles()

  return (
    <div className={classes.mainDiv}>

    <Container >
        {conversations.map((c)=>{
            
            
            return(
                <div className={classes.eachDiv} key={c._id} onClick={()=>setCurrentChat(c)}>
                <Conv  conversation={c}/>
                </div>
            )
        })}
        
    </Container>
    </div>
  )
}

export default ChatLeft