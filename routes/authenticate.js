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

  // no GET /login and Get /register. they're drop down menues

  // auth.get("/register", (req, res) => {
  //   db.query(`SELECT * FROM users;`)
  //     .then(data => {
  //       const users = data.rows;
  //       res.json({ users });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });

  // auth.get("/login");



  const register = (name, email, password, phone) => {
    return database.findUserByEmail(email)
      .then(user => {
        console.log("findUserByEmail returned", user)
        if (user) {
          return null;  //returns to line 48
        }
        password = bcrypt.hashSync(password, salt);
        return { name, email, password, phone };  // returns to line 48
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

    // const { name, email, password, phone } = { "name": "tt", "email": "tt", "password": "tt", "phone": "tt" };
    const { name, email, password, phone } = req.body;
    console.log({ name, email, password, phone });
    register(name, email, password, phone, database)
      .then(newUser => {
        console.log('newUser is: ', newUser);
        if (!newUser) {
          // console.log({error: 'User already exists! Please login!'});
          res.send({ error: 'User already exists! Please login!' });
          return;
        }
        //  assign cookie
        // send user object to ajax request
        // res.send(`new user added ${newUser.name}`);
        // res.render(/users/:user_id)


      })
      .catch((error) => {
        console.log(error)
        res.send(error.message)
      })
  });


  // database.addUser({ name, email, password, phone })
  //   .then(() => {
  //     res.redirect
  //   });



  //   req.session.user_id = userId;
  //   res.redirect("/  ");
  // }
  // });





  auth.post("/login");

  auth.post("/logout");

  return auth;

};
