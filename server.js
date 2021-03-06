// load .env data into process.env
// require('dotenv').config();    // commented this out after applying twilio

const dotENV = require('dotenv');
dotENV.config({ path: "./twilio.env" });
dotENV.config({ path: "./.env" })


// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');
const cookieSession = require('cookie-session');

//twilio router
const twilio = express.Router();
const { textSender } = require("./apiHelper/twilio.js")

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

//encrypted cookies
app.use(cookieSession({
  name: 'session',
  keys: ["key1", "key2"],
}));



app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");
const authRoutes = require("./routes/authenticate");
const database = require("./database");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(db));
app.use("/orders", ordersRoutes(db));
app.use("/", authRoutes(db));

// Note: mount other resources here, using the same pattern above


// Home page
// Separate them into separate routes files (see above).

app.use((req, res, next) => {
  console.log("hello");
  console.log(req.session)
  if (req.session.userId) {
    database.findUserById(req.session.userId).then((user) => {
      req.user = user
      next()
    });
  } else {
    req.user = null;
    next()
  }
})

app.get("/", (req, res) => {
  //  const templateVars = { user };

  res.render("index", { user: req.user });
});


app.get('/menu', (req, res) => {
  res.render('menu');
});

app.get('/admin', (req, res) => {
  res.render('admin');
});

app.get("/cart", (req, res) => {

  if (req.session.userId) {
    database.getMenuItems().then((menuItems) => {
      // console.log("menuItem is:", menuItems);
      const templateVars = { menuItems };
      res.render("cart", templateVars);
    })
  } else {
    res.redirect("/error_message3");
  }
});


app.get('/confirmation', (req, res) => {

  database.getMenuItems().then((menuItems) => {
    // console.log("menuItem is:", menuItems);
    const templateVars = { menuItems };
    res.render("confirmation", templateVars);
  })


});



app.get("/error_message", (req, res) => {
  res.render("error_message");
});

app.get("/error_message2", (req, res) => {
  res.render("error_message2");
});

app.get("/error_message3", (req, res) => {
  res.render("error_message3");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});











