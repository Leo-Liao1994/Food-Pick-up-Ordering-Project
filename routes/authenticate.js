/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const auth = express.Router();
const database = require("../database");

const app = express();

//encrypted cookies
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ["key1", "key2"],
}));


//hashed passwords
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(12);

module.exports = (db) => {


  const register = (name, email, password, phone) => {
    return database.findUserByEmail(email)
      .then(user => {
        console.log("findUserByEmail returned", user)
        if (user) {
          return null;
        }
        password = bcrypt.hashSync(password, salt);
        return { name, email, password, phone };
      })
      .then(user => {
        console.log('register function user: ', user);
        if (!user) {
          return null;
        }
        return database.addUser(user);
      })

  }



  auth.post("/register", (req, res) => {

    const { name, email, password, phone } = req.body;
    console.log({ name, email, password, phone });
    register(name, email, password, phone, database)
      .then(newUser => {
        console.log('newUser is: ', newUser);
        if (!newUser) {
          res.send({ error: 'User already exists! Please login!' });
          return;
        }

      })
      .catch((error) => {
        console.log(error)
        res.send(error.message)
      })
  });

  auth.post("/login");

  auth.post("/logout");

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
