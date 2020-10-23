/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");

const auth = express.Router();
const database = require("../database");


// hashed passwords
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
          res.redirect("/error_message");
          return;
        }
        req.session.userId = user.id;
        res.redirect("/");
      })
      .catch((error) => res.send(error.message));
  });

  const login = function (email, password) {
    return database.findUserByEmail(email)
      .then(user => {
        // console.log('user in login is: ', user)
        if (bcrypt.compareSync(password, user.password)) {
          return user;
        }
        return null;
      });
  }


  auth.post("/login", (req, res) => {
    const { email, password } = req.body;
    // console.log('req body inside post login: ', req.body)
    login(email, password)
      .then(user => {
        // console.log('user inside post login .then: ', user)
        if (!user) {
          return;
        } else if (req.body.email === "admin@delights.com") {
          res.redirect("/admin");
        } else {
          req.session.userId = user.id;
          res.redirect("/");
        }
      })
      .catch(error => res.redirect("/error_message2"));
  });


  auth.post("/logout", (req, res) => {
    req.session.userId = null;
    res.redirect("/");
  });
  return auth;
};





