const express = require("express");
const router = express.Router();
const Event = require("../modals/Events");

//create event

router.post("/", async (req, res) => {
  console.log(req.body);
  const loc = {
    type: "Point",
    coordinates: [req.body.lattitude, req.body.longitude],
  };
  req.body.loc = loc;
  const newEvent = await new Event(req.body);
  try {
    const savedEvent = await newEvent.save();
    res.status(200).json(savedEvent);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//get nearby post

router.post("/nearby", async (req, res) => {
  const long = req.body.long;
  const latt = req.body.latt;
  try {
    const event = await Event.find({
      loc: {
        $near: {
          $maxDistance: 30000,
          $geometry: {
            type: "Point",
            coordinates: [latt, long],
          },
        },
      },
    });

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all events
router.get('/all', async(req,res)=>{
    try {
       const allEvents = await Event.find()
       res.status(200).json(allEvents)
    } catch (error) {
        res.status(500).json(error)
        
    }
})

// interested
router.put('/:id/interest', async(req,res) => {
  try {
    const event = await Event.findById(req.params.id)
    if(!event.interested.includes(req.body.userId))
    {
      await event.updateOne({$push:{interested:req.body.userId}})
      res.status(200).json("the event is interested")
    }
    else
    {
      await event.updateOne({$pull:{interested:req.body.userId}})
      res.status(200).json("the interest is removed")
    }
  } catch (error) {
    
  }
})


//delete event
router.delete('/:id',async(req,res)=>{
  try {
    const event = await Event.findById(req.params.id)
    await event.deleteOne()
    res.status(200).json('the event has been deleted')
  } catch (error) {
    
  }
})

module.exports = router;
