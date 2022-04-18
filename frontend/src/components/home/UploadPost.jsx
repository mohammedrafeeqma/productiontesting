import {Card, makeStyles} from "@material-ui/core"
import { Cancel, EmojiEmotions, Label, PermMedia, Room } from "@material-ui/icons"
import { useState } from "react"
import UploadPostDialogue from "./UploadPostDialogue"
import {useSelector} from 'react-redux'

const useStyles = makeStyles((theme) => ({
    share:{
        width:"71%",
        borderRadius: "10px",
        backgroundColor:"",
        [theme.breakpoints.up('sm')]:{
            marginLeft: theme.spacing(15),
            marginRight: theme.spacing(15)
        },
        [theme.breakpoints.down('sm')]:{
            width:"100%",
        
            
        },
        marginBottom:theme.spacing(5)

    },
    shareWrapper:{
        padding:"10px"
    },
    shareTop:{
        display:"flex",
        alignItems:"center"
    },
    shareProfileImg:{
        width:"50px",
        height:"50px",
        borderRadius:"50%",
        objectFit:"cover",
        marginRight:"10px",

    },
    shareInput:{
        border:"none",
        width:"80%",
        fontSize:'16px'
    },
    shareHr:{
        margin:"20px",
        width:"65%"
    },
    shareImg:{
        width: '100%',
        objectFit: 'cover'
      },
      
      shareCancelImg:{
        position: 'absolute',
        top: "0",
        right: '20px',
        cursor: "pointer",
        opacity: '0.7'
      },
      shareBottom: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'spaceBetween',
        
      },
      
      shareOptions:{
          display: 'flex',
          marginLeft: "20px"
      },
      
      shareOption:{
          display: 'flex',
          alignItems: 'center',
          marginRight: "15px",
          cursor: 'pointer',
          [theme.breakpoints.down('sm')]:{
            display:"none"
        }
      },
      
      shareIcon:{
          fontSize: "18px",
          marginRight: "3px",
          
      },
      
      shareOptionText:{
          fontSize: '14px',
          fontWeight: '500'
      },
      
       shareButton:{
          border: 'none',
          padding: '7px',
          borderRadius: '5px',
          backgroundColor: 'green',
          fontWeight: 500,
          marginRight: '20px',
          cursor: 'pointer',
          color: 'white',
          [theme.breakpoints.down('sm')]:{
            width:"80%"
        }
          
      },
      
      shareImgContainer:{
        padding: '0 20px 10px 20px',
        position: 'relative'
      },
      
      shareImg:{
        width: '100%',
        objectFit: 'cover'
      },
      
      shareCancelImg:{
        position: 'absolute',
        top: '0',
        right: '20px',
        cursor: 'pointer',
        opacity: '0.7'
      }

}))

function UploadPost() {
    const classes = useStyles()
    const[openShare, setOpenShare] = useState(false)
    const userDetails = useSelector((state) => state.userDetails)
    const {loading, error, user} = userDetails;

    const handleClickShare = ()=>{
        setOpenShare(true)
    }
    const handleClose = ()=>{
        setOpenShare(false)
    }
  return (
     <>
      <UploadPostDialogue openShare={openShare} handleClose={handleClose}/>
    <Card className={classes.share} onClick={handleClickShare}>
        <div className={classes.shareWrapper}>
            <div className={classes.shareTop}>
                <img
                className={classes.shareProfileImg}
                src={user.profilePicture?user.profilePicture:'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}
                />
                <input
                placeholder="What's in your mind"
                className={classes.shareInput}
                />
            </div>
            <hr className={classes.shareHr}/>
            <div className={classes.shareImgContainer}>
                <img
                className={classes.shareImg}
                src=''
                />
                
            </div>

            <form className={classes.shareBottom} onSubmit={''}>
                <div className={classes.shareOptions}>

                <label className={classes.shareOption} >
              <PermMedia htmlColor="tomato" className={classes.shareIcon}/>
              <span className={classes.shareOptionText}>Photo or Video</span>
            </label>
            <div className={classes.shareOption}>
              <Label htmlColor="blue" className={classes.shareIcon} />
              <span className={classes.shareOptionText}>Tag</span>
            </div>
            <div className={classes.shareOption}>
              <Room htmlColor="green" className={classes.shareIcon} />
              <span className={classes.shareOptionText}>Location</span>
            </div>
            <div className={classes.shareOption}>
              <EmojiEmotions htmlColor="goldenrod" className={classes.shareIcon} />
              <span className={classes.shareOptionText}>Feelings</span>
            </div>
          </div>
          <button className={classes.shareButton} type="submit">
            Share
          </button>

            
            </form>

        </div>
    </Card>
    </>
  )
}

export default UploadPost