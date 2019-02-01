const express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose');
const app = express();
const passport = require("passport");
const users = require("./routes/api/users");
const events = require("./routes/api/events");
var cors = require('cors')
const multer = require('multer')
const path = require('path')
// generate a new express app and call it 'app'


// serve static files in public
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({ 
    extended: true
  })
);

// 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors())



//DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
  .connect(db)
  .then(()=>console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/events", events);






const port = process.env.PORT || 3001;
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, "client", "build")))
  // app.use('/uploads', express.static('uploads'))
  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}else{
  app.use(express.static('public'))
  app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/public/index.html');
  app.use('/uploads', express.static('uploads'))
})
}


app.listen(port, () => console.log(`Server started in port ${port}`))

