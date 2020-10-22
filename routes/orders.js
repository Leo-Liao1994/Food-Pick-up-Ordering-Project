/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const orders = express.Router();
const database = require("../database");

module.exports = (db) => {


  orders.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  orders.post("/")

  orders.get("/:order_id")

  orders.put("/:order_id")

  orders.delete("/:order_id")

  return orders;
};
