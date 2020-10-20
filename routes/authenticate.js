/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const auth = express.Router();

module.exports = (db) => {

  auth.get("/register")

  auth.get("/login")

  auth.post("/register")

  auth.post("/login")

  auth.post("/logout")


  return auth;
};





// auth.post("/register", (req, res) => {
//   if(req.body.email === "" || req.body.password === "" || req.body.name === "" ||req.body.phone === ""){
//     res.sendStatus('404')
//   }
// for (let i in users) {
//   if(req.body.email === users[i].email){
//     res.sendStatus('404')
//     }
//   }

// users[randomID] = newUser;
// req.session.userID = randomID;
// res.redirect("/")
// });
