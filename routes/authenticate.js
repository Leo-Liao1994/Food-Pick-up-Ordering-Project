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
