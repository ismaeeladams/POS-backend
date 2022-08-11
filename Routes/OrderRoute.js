const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");
const jwt = require("jsonwebtoken");

// Get All Orders
router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM orders", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Get one Order
router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM orders WHERE order_id = ${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Add new order
router.post("/", (req, res) => {
  const { amount, shipping_address, order_email, order_date, order_status } =
    req.body;
  try {
    con.query(
      `Insert into orders(amount,shipping_address,order_email,order_date,order_status) VALUES ("${amount}", "${shipping_address}", "${order_email}", "${order_date}", "${order_status}")`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// Delete one order
router.delete("/:id", (req, res) => {
  try {
    con.query(
      `DELETE FROM orders WHERE order_id = ${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Edit Users by ID
router.put("/:id", (req, res) => {
  const { amount, shipping_address, order_email, order_date, order_status } =
    req.body;
  try {
    con.query(
      `UPDATE orders SET amount = "${amount}", shipping_address = "${shipping_address}", order_email = "${order_email}", order_date = "${order_date}", order_status = "${order_status}" WHERE order_id = "${req.params.id}" `,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
