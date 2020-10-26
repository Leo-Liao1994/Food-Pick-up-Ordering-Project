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
const { promiseImpl } = require('ejs');



module.exports = (db) => {
  orders.post("/", (req, res) => {
    console.log("this is the req.body", req.body);

    const orderedMenuItems = req.body.items;
    console.log("order items are", orderedMenuItems);
    let addOrderItemQueries = [];
    if (orderedMenuItems && orderedMenuItems.length > 0) {
      const validItems = orderedMenuItems.filter(function (item) {
        return parseInt(item.qty) && item.id;
      });
      console.log('filtered items', validItems);
      addOrderItemQueries = validItems.map(function (menuItem) {
        const addOrdersQuery = `
          INSERT INTO cart_items (menu_item_id, quantity)
          VALUES (${menuItem.id}, ${menuItem.qty})
          RETURNING *`;
          console.log(addOrdersQuery, 'order query is:');
        return db.query(addOrdersQuery);
      });
    } else {
      res.sendStatus(400);
      return res.send('Could not find any menu items!');
    }
    return Promise.all(addOrderItemQueries).then(() => {
      res.send('ok');
    });
  });


  return orders;

};



