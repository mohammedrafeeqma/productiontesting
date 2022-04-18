import { Card, makeStyles } from "@material-ui/core";
import { Cancel, EmojiEmotions, Label, PermMedia, Room } from "@material-ui/icons";
import { Dialog, DialogTitle, Tooltip, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import {useSelector} from 'react-redux'

const useStyles = makeStyles((theme) => ({
  share: {
    
    borderRadius: "10px",
    backgroundColor: "",
    // marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    margin: theme.spacing(1),
    minHeight: "50vh",
    position: 'relative'
  },
  shareWrapper: {
    padding: "10px",
  },
  shareTop: {
    display: "flex",
    alignItems: "center",
  },
  shareProfileImg: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
    marginRight: "10px",
  },
  shareInput: {
    border: "none",
    width: "80%",
    height:'100%',
    fontSize:'16px',
    "&:hover":{
      height:'100%',
      padding:'10px',
      border:'none'
    }
  },
  shareHr: {
    margin: "20px",
    width: "90%",
  },
  shareImg: {
    width: "100%",
    objectFit: "cover",
  },

  shareCancelImg: {
    position: "absolute",
    top: "0",
    right: "20px",
    cursor: "pointer",
    opacity: "0.7",
  },
  shareBottom: {
    display: "flex",
    alignItems: "center",
    justifyContent: "spaceBetween"
  },

  shareOptions: {
    display: "flex",
    marginLeft: "20px",
  },

  shareOption: {
    display: "flex",
    alignItems: "center",
    marginRight: "15px",
    cursor: "pointer",
  },

  shareIcon: {
    fontSize: "28px",
    marginRight: "8px",
    [theme.breakpoints.down('sm')]:{
        fontSize:"34px"
    }
  },

  shareOptionText: {
    fontSize: "14px",
    fontWeight: "500",
  },

  shareButton: {
    border: "none",
    padding: "7px",
    borderRadius: "5px",
    backgroundColor: "green",
    fontWeight: 500,
    marginRight: "20px",
    cursor: "pointer",
    color: "white",
    position:'absolute',
    bottom:10,
    right:30,
    [theme.breakpoints.down('sm')]:{
        width:"80%",
        right:0,
        left:15,
        bottom:0
    }
  },

  shareImgContainer: {
    padding: "0 20px 10px 20px",
    position: "relative",
  },

  shareImg: {
    width: "100%",
    objectFit: "cover",
  },

  shareCancelImg: {
    position: "absolute",
    top: "0",
    right: "20px",
    cursor: "pointer",
    opacity: "0.7",
  },
 
  feelings: {
    display: "flex",
    alignItems: "center",
    marginRight: "15px",
    cursor: "pointer",

    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  shareImgPreviewContainer:{
    position:'relative',
    height:"50px",
    width:"50%",
    backgroundColor:'red',
    marginBottom:theme.spacing(9)
  },
  shareImgPreview:{
    height:"100%px",
    width:"100%",
  },
  cancelButton:{
    position:"absolute",
    right:'0'
  },
  formError:{
    marginLeft:theme.spacing(3)
  }
}));

function UploadPostDialogue({ openShare, handleClose }) {
  const classes = useStyles();
  const[file, setFile] = useState(null)
  const[formError, setFormError] = useState('')
  const[image, setImage] = useState(null)
  const[description, setDescription]= useState('')
  const userDetails = useSelector( state => state.userDetails)
  const{ loading, error, user} = userDetails
  const formHandler= async(e)=>{
    e.preventDefault()
    let reader = new FileReader
    if(!file)
      {
        try {
          await axios.post('api/post/',{userId:user._id, desc:description})
          handleClose()
        } catch ({response}) {
          console.log(response);
        }
      }
      else{
         reader.readAsDataURL(file);
    reader.onloadend = async()=>{
      setImage(reader.result)
      
      if(file.size<100000)
      {
        imageSubmit(reader.result)
      }
      else{
        setFormError('*image size is larger')
    
      }
      
    }
      }
   
    
  }

  const imageSubmit= async(base64image)=>{
    try {
      let suc = await axios.post('api/post/upload',{image:base64image})
      await axios.post('api/post/',{userId:user._id,desc:description, img:suc.data})
      handleClose()
    } catch ({response}) {
      console.log(response);
    }
  }
  
  return (
    <Dialog open={openShare} onClose={handleClose} fullWidth>
      <DialogTitle>Create a Post</DialogTitle>
      {formError? <Typography className={classes.formError} color='red'>{formError}</Typography> :'' }
      <Card className={classes.share}> 
        <div className={classes.shareWrapper}>
          <div className={classes.shareTop}>
            <img
              className={classes.shareProfileImg}
              src={user.profilePicture?user.profilePicture:'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}
            />
            <textarea

              placeholder="What's in your mind"
              value={description}
              onChange={(e)=>{setDescription(e.target.value)}}
              className={classes.shareInput}
            />
          </div>
          <hr className={classes.shareHr} />
          <div className={classes.shareImgContainer}>
            <img className={classes.shareImg} src="" />
          </div>

          <form className={classes.shareBottom} onSubmit={formHandler}>
            <div className={classes.shareOptions}>
              <label htmlFor="file" className={classes.shareOption}>
                <PermMedia htmlColor="tomato" className={classes.shareIcon} />
                <span className={classes.shareOptionText}>Photo or Video</span>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  onInputCapture={(e)=>{setFile(e.target.files[0])}}
                />
              </label>
              <Tooltip title="comming soon">
              <div className={(classes.feelings)}>
                <Label htmlColor="blue" className={classes.shareIcon} />
                <span className={classes.shareOptionText}>Tag</span>
              </div>
              </Tooltip>
              <Tooltip title="comming soon">
              <div className={(classes.feelings)}>
                <Room htmlColor="green" className={classes.shareIcon} />
                <span className={classes.shareOptionText}>Location</span>
              </div>
              </Tooltip>
              <Tooltip title="comming soon">
              <div className={(classes.feelings)}>
                <EmojiEmotions
                  htmlColor="goldenrod"
                  className={classes.shareIcon}
                />
                <span className={classes.shareOptionText}>Feelings</span>
              </div>
              </Tooltip>
            </div>
            <button className={classes.shareButton} type="submit">
              Share
            </button>
          </form>
        </div>
        {file && (
          <div className={classes.shareImgPreviewContainer}>
            <Cancel className={classes.cancelButton}/>
            <img className={classes.shareImgPreview} src={URL.createObjectURL(file)} alt=""/>
          </div>
        )}
      </Card>
    </Dialog>
  );
}

export default UploadPostDialogue;
