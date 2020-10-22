/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const orders = express.Router();
const database = require("../database");
const authRoutes = require("../routes/authenticate");



module.exports = (db) => {



  orders.post("/", (req,res) =>{
    console.log(req.body)
    res.send('ok')
  })

  orders.get("/:order_id")

  orders.put("/:order_id")

  orders.delete("/:order_id")

  return orders;

};



