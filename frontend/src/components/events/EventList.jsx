import {
  Button,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import EventListCard from "./EventListCard";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(1),
    width: "30%",
  },
  main: {
    marginTop: theme.spacing(15),
    margin: theme.spacing(10),
  },
  mainDiv: {
    backgroundColor: grey[50],
    display: "flex",
    justifyContent: "start",
    flexWrap: "wrap",
  },
  cardContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mainText: {
    fontSize: "18px",
  },
  datetext: {
    fontWeight: 600,
  },
  addresstext: {
    fontWeight: 500,
    color: "#aba7a7",
  },
  interesttext: {
    color: "#575859",
  },
  followButton: {
    marginTop: theme.spacing(1),
    backgroundColor: "#0D8E8E",
    color: "white",
  },
}));

function EventList() {
  let { nearby } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const [long, setLong] = useState(null);
  const [latt, setLatt] = useState(null);
  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [stage, setStage] = useState(false);
  const[eventStage, setEventStage] = useState(false)
  const [refresh, setRefresh] = useState(false);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const [yourEvent, setYourEvent] = useState(false);

  useEffect(() => {
    if (nearby === "nearby") {
      setEventStage(false)
      setYourEvent(false)
      setStage(true);
    } else if (nearby === "yourevents") {
      setStage(false)
      setEventStage(false)
      setYourEvent(true);

    } else {
      setStage(false);
      setYourEvent(false)
      setEventStage(true)

    }
  });
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }
  const showPosition = (position) => {
    setLong(position.coords.longitude);
    setLatt(position.coords.latitude);
  };
  getLocation();
  useEffect(() => {
    const getEventLists = async () => {
      const res = stage
        ? await axios.post(`/api/event/nearby`, { long, latt })
        : await axios.get("/api/event/all");
      
      setEvents(res.data);
    };
    getEventLists();
  }, [long, latt, stage, refresh]);


  return (
    <Card className={classes.main}>
      <Typography
        style={{ margin: "10px 0px 20px 15px", fontWeight: 500 }}
        variant="h5"
      >
        {stage ? "Nearby Events" : yourEvent? "Intereted Events": "All Events"}
      </Typography>
      <div className={classes.mainDiv}>
        {events?.map((f) => {
          return (
            <>
           {yourEvent? f.interested.includes('622ca39b28782d07e0b8f754') && <EventListCard
              refresh={refresh}
              setRefresh={setRefresh}
              long={long}
              latt={latt}
              f={f}
            /> : 
            <EventListCard
              refresh={refresh}
              setRefresh={setRefresh}
              long={long}
              latt={latt}
              f={f}
            />
            }
            </> 
          );
        })}
      </div>
    </Card>
  );
}

export default EventList;
