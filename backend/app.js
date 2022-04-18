const express = require('express')
const app = express()
const path = require('path')
const createError = require('http-errors');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors');
const morgan = require('morgan')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const adminRoute = require('./routes/admin')
const postRoute = require('./routes/posts')
const conversationRoute = require('./routes/conversation')
const messageRoute = require('./routes/message')
const eventRoute = require('./routes/events')
const notificationRoute = require('./routes/notification')
console.log(path.join(__dirname, '../frontend/build'));

dotenv.config()
app.use(cors())

// mongoose.connect('mongodb://localhost:27017/socialMedia', {useNewUrlParser: true},()=>{
//     console.log("mongoose connected");
// })
mongoose.connect(process.env.MONGO_URL,()=>{
    console.log("mongoDB connected");
})

//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json()) // it is a body parser when you make post request it parse
app.use(morgan('common'))

app.use('/api/user' , userRoute)
app.use('/api/auth', authRoute)
app.use('/api/admin', adminRoute)
app.use('/api/post', postRoute)
app.use('/api/conversation', conversationRoute)
app.use('/api/message', messageRoute)
app.use('/api/event/', eventRoute)
app.use('/api/notification',notificationRoute)



app.use('/uploads', express.static('uploads'));

if(process.env.NODE_ENV === 'production')
{
  console.log(111);
  app.use(express.static(path.join(__dirname,'../', '/frontend/build')))
  app.get('/*', (req, res) =>
    res.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'))
  )
}
else
{
  console.log(3333);
  app.get('/', (req, res) => {
    console.log("runnn");
    res.send('API is running....')
  })
}





// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });


app.use(function(err, req, res, next) {
    
  
    // render the error page
    console.log("error consoling");
    console.log(err);
    res.status(500);
    res.json('error');
  });

  const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`Server is running`);
})