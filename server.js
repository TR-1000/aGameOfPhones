//___________________
//REQUIREMENTS
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
const mongoURI = "mongodb://localhost 27017/"+"gameOfPhones";
const MONGODB_URI = process.env.MONGODB_URI;
const bcrypt = require("bcrypt");
const session = require("express-session")
const Phone = require("./models/phones.js");
const User = require("./models/users.js")

//___________________
//PORT
//___________________

const PORT = process.env.PORT || 3000;

//___________________
//THE MONGOD
//___________________
<<<<<<< HEAD
// THAT MONGOOSE CONNECTION
=======
//That mongoose connection
>>>>>>> 58acb0a04b3c88f19b15cf20e7b90db3d35e600c
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true}, () => {
  console.log("Someday we'll find it, the mongoose connection...");
});

// Warnings fix
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);



// Error handling
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));


//___________________
//MIDDLEWARE
//___________________

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());//
app.use(methodOverride("_method"));
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: false,
}));


//___________________
// ROUTES
//___________________



If anyone is reading this as any ideas I'd appreciate it.*/

/*home*/
app.get("/", (req, res) => {
  if (typeof req.session === "undefined") {
    res.render("home.ejs");
  } else {
    res.render("home.ejs", {
      currentUser: req.session.currentUser
    });
  };
});

/*new*/
app.get("/phones/new", (req,res) => {
  if (typeof req.session === "undefined") {
    console.log(typeof req.session);
    res.render("new.ejs");
  } else {
    console.log("req.session is",typeof req.session);
    console.log("This is session", req.session);
    res.render("new.ejs", {
      currentUser: req.session.currentUser
    });
  };
});


/*create*/
app.post("/phones", (req, res) => {
  Phone.create(req.body, (error, newPhone) => {
    console.log(req.body);
    res.redirect("/phones");
  });
});


/*index*/
app.get("/phones", (req, res) => {
  console.log("the current user is", req.session.currentUser);
  Phone.find({}, (error, collection) => {
    if (typeof req.session === "undefined") {
      res.render("index.ejs", {
        phones:collection,
      });
    } else {
      res.render("index.ejs", {
        phones:collection,
        currentUser: req.session.currentUser
      });
    };
  });
});



/*show*/
app.get("/phones/:id", (req, res) => {
  console.log("show route", req.session);
  Phone.findById(req.params.id, (error, foundPhone) => {
    if (typeof req.session === "undefined") {
      res.render("show.ejs", {
        phone:foundPhone
      });
    } else {
      res.render("show.ejs", {
        phone:foundPhone,
        currentUser: req.session.currentUser
      });
    };
  });
});


/*edit*/
app.get("/phones/:id/edit", (req, res) => {
  Phone.findById(req.params.id, (error, foundPhone) => {
    if (typeof req.session === "undefined") {
      res.render("edit.ejs", {
        phone: foundPhone
      });
    } else {
      res.render("edit.ejs", {
        phone: foundPhone,
        currentUser: req.session.currentUser
      });
    };
  });
});


/*update*/
app.put("/phones/:id", (req, res) => {
  Phone.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedPhone) => {
    res.redirect(`/phones/${req.params.id}`)
  });
});


/*delete*/
app.delete("/phones/:id", (req, res) => {
  Phone.findByIdAndRemove(req.params.id, (error, data) => {
    res.redirect("/phones");
  });
});

const userController = require('./controllers/users.js');
app.use('/users', userController);

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);


//___________________
//LISTENER
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
