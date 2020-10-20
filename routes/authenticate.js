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
    register(name, email, password, phone, database)
      .then(user => {
        if (!user) {
          res.send({ error: 'User already exists! Please login!' });
          return;
        }
        req.session.userId = user.id;
        res.send({ user: { name: user.name, email: user.email, phone: user.phone, id: user.id } });
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
          res.send({error: "error"});
          return;
        }
        req.session.userId = user.id;
        res.send({user: {name: user.name, email: user.email, id: user.id}});
      })
      .catch(error => res.send(error));
  });





  auth.post("/logout", (req, res) => {
    req.session.userId = null;
    res.send({});
  });


  return auth;

};
