/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express    = require("express");

const auth = express.Router();
const database = require("../database");


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
    register(name, email, password, phone, database)
      .then(user => {
        if (!user) {
          res.send({ error: 'User already exists! Please login!' });
          return;
        }
        console.log("request session is:", req.session);
        req.session.userId = user.id;
        res.redirect("/");
      })
      .catch((error) => res.send(error.message));
  });





  const login = function(email, password) {
    return database.findUserByEmail(email)
      .then(user => {
        if (bcrypt.compareSync(password, user.password)) {
          return user;
        }
        return null;
      });
  }



  auth.post("/login", (req, res) => {
    const {email, password} = req.body;
    login(email, password)
      .then(user => {
        if (!user) {
          res.redirect({error: "error"});
          return;
        }
        req.session.userId = user.id;
        res.redirect("/");
      })
      .catch(error => res.send(error));
  });




  auth.post("/logout", (req, res) => {
    req.session.userId = null;
    res.redirect("/");
  });


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
