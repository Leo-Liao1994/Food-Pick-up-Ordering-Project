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

    const orderedMenuItems = req.body.items; //get all the menu items from the front-end payload
    console.log("order items are", orderedMenuItems);
    let addOrderItemQueries = [];
    if (orderedMenuItems && orderedMenuItems.length > 0) { // check if thefront-end passed in an array of menu items
      const validItems = orderedMenuItems.filter(function (item) {
        return parseInt(item.qty) && item.id;
      }); // remove any menu items that don't have an id (above 0) or don't have quanity above 0
      console.log('filtered items', validItems);
      addOrderItemQueries = validItems.map(function (menuItem) {
        const addOrdersQuery = `
          INSERT INTO orders (menu_item.id, quantity)
          VALUES (${menuItem.id}, ${menuItem.qty})
          RETURNING *`;
          console.log(addOrdersQuery, 'order query is:');
        return db.query(addOrdersQuery);
      }); // create an array of database INSERT queries, one for each menu item in the order, adding each to the database
    } else {
      res.sendStatus(400);
      return res.send('Could not find any menu items!'); // send bad request or invalid format
    }
    return Promise.all(addOrderItemQueries).then(() => {
      res.send('ok');
    }); // execute ALL the queries for inserting order items and their quanitities to the database; once complete,respond to the front-end with "OK", 200
  });

  orders.get("/:order_id")

  orders.put("/:order_id")

  orders.delete("/:order_id")

  return orders;

};



