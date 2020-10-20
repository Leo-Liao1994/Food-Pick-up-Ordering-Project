/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const auth = express.Router();
const database = require("../database");

//encrypted cookies
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['8bf38336b2fe538d6916ca845f8e5b4f', '2baccf00b3d092bb8ef46ae35f8e5be9']
}));

//hashed passwords
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

module.exports = (db) => {

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


  auth.get("/login");



  const register = (name, email, password, phone) => {
    return database.findUserByEmail(email)
      .then(user => {
        console.log("findusrbyem returned", user)
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
    const {name, email, password, phone} = req.body;
    console.log({ name, email, password, phone });
    register(name, email, password, phone, database)
      .then(newUser => {
        console.log('newUser: ', newUser);
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
  })


  //   const userId = generateRandomString();   //PK from users database
  //   const email = req.body.email;
  //   const password = req.body.password;
  //   password = bcrypt.hashSync(password, 10)

  //   // or have 56 and 57 as :  const password = bcrypt.hashSync(req.body.password, 10)

  //   if (email === '' || password === '') {
  //     res.status(400).send("Please provide a valid email and/or password.");
  //   } else if (findUserByEmail(users, email)) {   //come back to it later
  //     res.status(400).send("User already exists!");   //come back to it later
  //   } else {
  //     // users[userId] = {
  //     //   id: userId,
  //     //   email,
  //     //

  //     database.addUser({ email, password })
  //       .then(() => {
  //         res.redirect
  //       })
  //       ;

  //   };
  //   req.session.user_id = userId;
  //   res.redirect("/urls");
  // }
  // });





// auth.post("/login");

// auth.post("/logout");


return auth;


};
