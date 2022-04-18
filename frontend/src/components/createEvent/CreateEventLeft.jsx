import {Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, TextField, Typography} from "@material-ui/core"
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DateTimePicker from '@mui/lab/DateTimePicker'
import { useState } from "react"
import { InsertPhotoOutlined } from "@material-ui/icons"
import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import axios from "axios";
import Slide from '@mui/material/Slide';
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

mapboxgl.accessToken = 'pk.eyJ1IjoicmFmZWVxbWEiLCJhIjoiY2wxYTlsZzN1MXZoMDNra2F1NjJqcTJyYyJ9.TDBOKYasvrOBMQwuzbm3Ew'

const useStyles = makeStyles((theme) => ({
    container:{
        position:'sticky',
        top:0,
        paddingTop: theme.spacing(10),
        backgroundColor: theme.palette.grey[50],
        height:'100vh',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between'
    },
    item:{
        display:'flex',
        alignItems:'center',
        marginBottom: theme.spacing(4)
    },
    icon:{
        marginRight: theme.spacing(1)
    },
    text:{
        fontWeight: 900,
        fontSize:'20px'
    },
    profile:{
        display:'flex'
    },
    profileImg:{
        height:'40px',
        width:'40px',
        borderRadius:'50%',
        marginRight:theme.spacing(2)
    },
    mapContainer: {
        border: '5px',
        height: '400px',
        width: '30vw'
      },
    imgPreview:{
     objectFit:'cover',
     width: '100%',
     height:'150px'

    },
    button:{
      paddingBottom: theme.spacing(4)
    },
    backButton:{
      marginRight: theme.spacing(2)
    }
}))

function CreateEventLeft({description, setDescription, value,address, setAddress, setValue, eventName, setEventName}) {
    const classes = useStyles()
    const mapContainerRef = useRef(null);
    const[mapOpen, setMapOpen] = useState(false)
    const[step, setStep] = useState(1)
    const[longitude, setLongitude] = useState(null)
    const[lattitude, setLattitude] = useState(null)
    const[image, setImage] = useState(null)
    const[file, setFile] = useState(null)
    const navigate = useNavigate()
    const userDetails = useSelector( state =>state.userDetails)
    const{loading, error, user} = userDetails

    const nextStep= ()=>{
        setStep(step+1)
    }
    const backStep = ()=>{
        setStep(step-1)
    }
    const formHandler = (e)=>{
      e.preventDefault()
      let reader = new FileReader
      reader.readAsDataURL(file)
      reader.onloadend = async()=>{
        setImage(reader.result)
        if(file.size < 100000)
        {
          imageSubmit(reader.result)
        }
      }
    }

    const imageSubmit = async(base64image)=>{
      try {
        let suc = await axios.post('api/post/upload',{image:base64image})
        await axios.post('api/event/',{eventName,date:value,address,description,img:suc.data,longitude,lattitude,ownerId:user._id})
        navigate('/events/all')
      }
      catch(error){

      }
    }
    const getAddress = async(lng, lat) => {

        // reset({
        //   longitude:lng,
        //   latitude:lat
        // })
    
        const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=poi&access_token=${mapboxgl.accessToken}`)
        if (data.features[0].place_name) {
          console.log(data.features[0].place_name);
          setAddress(data.features[0].place_name)
          // reset({
          //   address:data.features[0].place_name
          // })
          // address.innerHTML = data.features[0].place_name
          // addressInput.value = data.features[0].place_name
        }
      }


    const showMap = () => {
        setMapOpen(true)
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        }
    
        function showPosition(position) {
          let lat = position.coords.latitude
          let long = position.coords.longitude
        
          console.log(long, lat)
          setLongitude(long)
          setLattitude(lat)
          getAddress(long, lat)
    
          const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            // See style options here: https://docs.mapbox.com/api/maps/#styles
            style: "mapbox://styles/mapbox/streets-v11",
            center: [long, lat],
            zoom: 13,
          });
    
          const marker = new mapboxgl.Marker({
            draggable: true,
          })
            .setLngLat([long, lat])
            .addTo(map);
    
          marker.on('dragend', e => {
            let LngLat = e.target.getLngLat()
            console.log(LngLat);
            setLongitude(LngLat.lng)
            setLattitude(LngLat.lat)
            getAddress(LngLat.lng, LngLat.lat)
    
          })
          const geocoder = new MapboxGeocoder({
            mapboxgl: mapboxgl,
            accessToken: mapboxgl.accessToken,
            marker: false,
    
          })
          geocoder.on('result', e => {
            let lng = e.result.geometry.coordinates[1]
            let lat = e.result.geometry.coordinates[0]
    
            marker.setLngLat(e.result.center)
              .addTo(map)
    
            // longitude.value = lng
            // latitude.value = lat
    
            // address.innerHTML = e.result.place_name
            // addressInput.value = e.result.place_name
    
          })
          // add navigation control (the +/- zoom buttons)
          map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
          map.addControl(geocoder)
        }
      }
  switch (step) {
      case 1:
        return (
            <>
            <Container className={classes.container}>
               <div className={classes.form}>
               <div className={classes.item} >
                    <Typography variant="h5">Event Details</Typography>
                </div>
                <div className={classes.item}>
                    <div className={classes.profile}>
                        <img src="https://www.jeancoutu.com/globalassets/revamp/photo/conseils-photo/20160302-01-reseaux-sociaux-profil/photo-profil_301783868.jpg" className={classes.profileImg}/>
                        <Typography variant="h6">Rafeeq ma</Typography>
                    </div>
                </div>
                <div className={classes.item}>
                    <TextField value={eventName} onChange={(e)=>setEventName(e.target.value)} fullWidth label="Event Name" variant="outlined" />
                </div>
                <div className={classes.item}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                        renderInput={(props) => <TextField fullWidth variant="outlined" {...props} />}
                        label="DateTime"
                        value={value}
                        onChange={(newValue)=>{
                            setValue(newValue)
                        }}
                        />
                        
                    </LocalizationProvider>
                </div>
               </div>
               <div className={classes.button}>
                    <div style={{marginBottom:'10px', display:'flex'}}>
                        <div style={{backgroundColor:'#0D8E8E', height:'7px', width:'25%', borderRadius:'10px', margin:'1px'}}></div>
                        <div style={{backgroundColor:'grey', height:'7px', width:'25%', borderRadius:'10px', margin:'1px'}}></div>
                        <div style={{backgroundColor:'grey', height:'7px', width:'25%', borderRadius:'10px', margin:'1px'}}></div>
                        <div style={{backgroundColor:'grey', height:'7px', width:'25%', borderRadius:'10px', margin:'1px'}}></div>
                    </div>
                        <Button className={classes.backButton} variant='outlined' disabled>Back</Button>
                       {eventName? <Button variant='outlined' onClick={nextStep}>Next</Button>
                       : <Button className={classes.nextButton} variant="outlined" disabled>Next</Button>}
               </div>
            </Container>
            </>
          );
          case 2 :
              return (
                <>
                <Dialog
          open={mapOpen}
          TransitionComponent={Transition}
          keepMounted
          maxWidth="sm"
          onClose={()=>setMapOpen(false)}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{address}</DialogTitle>
          <DialogContent>
          <div className={classes.mapContainer} ref={mapContainerRef} />
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>setMapOpen(false)}>Disagree</Button>
            <Button onClick={()=>setMapOpen(false)}>Agree</Button>
          </DialogActions>
        </Dialog>
                <Container className={classes.container}>
                   <div className={classes.form}>
                   <div className={classes.item} >
                        <Typography variant="h5">Event Details</Typography>
                    </div>
                   
                    <div className={classes.item}>
                        <TextField onClick={()=>showMap()} fullWidth label={address? address: 'Location'} variant="outlined" />
                    </div>
                    
                   </div>
                   <div className={classes.button}>
                        <div style={{marginBottom:'10px', display:'flex'}}>
                            <div style={{backgroundColor:'#0D8E8E', height:'7px', width:'25%', borderRadius:'10px', margin:'1px'}}></div>
                            <div style={{backgroundColor:'#0D8E8E', height:'7px', width:'25%', borderRadius:'10px', margin:'1px'}}></div>
                            <div style={{backgroundColor:'grey', height:'7px', width:'25%', borderRadius:'10px', margin:'1px'}}></div>
                            <div style={{backgroundColor:'grey', height:'7px', width:'25%', borderRadius:'10px', margin:'1px'}}></div>
                        </div>
                        <Button className={classes.backButton} variant='outlined' onClick={backStep}>Back</Button>
                       {address? <Button variant='outlined' onClick={nextStep}>Next</Button>
                       : <Button className={classes.nextButton} variant="outlined" disabled>Next</Button>}
                   </div>
                </Container>
                </>
              );
              case 3 :
              return (
                <>
                <Container className={classes.container}>
                   <div className={classes.form}>
                   <div className={classes.item} >
                        <Typography variant="h5">Event Details</Typography>
                    </div>
                    
                    <div className={classes.ite}>
                        <Typography variant="h6">Description</Typography>
                        <Typography style={{margin:'8px 0 20px 0'}} variant="p">Provide more information about your event so that guests know what to expect</Typography>
                        <TextField style={{marginTop:'20px'}} value={description} onChange={(e)=>setDescription(e.target.value)} fullWidth label="Description" variant="outlined" />
                    </div>
                    
                   </div>
                   <div className={classes.button}>
                        <div style={{marginBottom:'10px', display:'flex'}}>
                            <div style={{backgroundColor:'#0D8E8E', height:'7px', width:'25%', borderRadius:'10px', margin:'1px'}}></div>
                            <div style={{backgroundColor:'#0D8E8E', height:'7px', width:'25%', borderRadius:'10px', margin:'1px'}}></div>
                            <div style={{backgroundColor:'#0D8E8E', height:'7px', width:'25%', borderRadius:'10px', margin:'1px'}}></div>
                            <div style={{backgroundColor:'grey', height:'7px', width:'25%', borderRadius:'10px', margin:'1px'}}></div>
                        </div>
                        <Button className={classes.backButton} variant='outlined' onClick={backStep}>Back</Button>
                       {description? <Button variant='outlined' onClick={nextStep}>Next</Button>
                       : <Button className={classes.nextButton} variant="outlined" disabled>Next</Button>}
                   </div>
                </Container>
                </>
              )
              case 4 :
              return (
                <>
                <Container className={classes.container}>
                   <div className={classes.form}>
                   <div className={classes.item} >
                        <Typography variant="h5">Additional Details</Typography>
                    </div>
                    
                    <div className={classes.ite}>
                        <Card>
                            {file? 
                            <div style={{height:'150px'}}>
                                <img className={classes.imgPreview} src={URL.createObjectURL(file)} />
                            </div>
                            :
                            <div style={{height:'150px',display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    <div className={classes.icon}>
                                        <InsertPhotoOutlined/>
                                    </div>
                                    <Typography>
                                        <label htmlFor="inputfile"> uplaod photo</label>
                                        <input onInputCapture={(e)=>setFile(e.target.files[0])} style={{display:'none'}} type='file' id='inputfile'/>
                                    </Typography>
                                    
                            </div> 
                            }
                        </Card>
                    </div>
                    
                   </div>
                   <div className={classes.button}>
                        <div style={{marginBottom:'10px', display:'flex'}}>
                            <div style={{backgroundColor:'#0D8E8E', height:'7px', width:'25%', borderRadius:'10px', margin:'1px'}}></div>
                            <div style={{backgroundColor:'#0D8E8E', height:'7px', width:'25%', borderRadius:'10px',margin:'1px'}}></div>
                            <div style={{backgroundColor:'#0D8E8E', height:'7px', width:'25%', borderRadius:'10px',margin:'1px'}}></div>
                            <div style={{backgroundColor:'#0D8E8E', height:'7px', width:'25%', borderRadius:'10px',margin:'1px'}}></div>
                        </div>
                        <Button className={classes.backButton} variant='outlined' onClick={backStep}>Back</Button>
                       {file? <Button variant='outlined' onClick={formHandler}>Create Event</Button>
                       : <Button className={classes.nextButton} variant="outlined" disabled>Create Event</Button>}
                   </div>
                </Container>
                </>
              )
  }
}

export default CreateEventLeft