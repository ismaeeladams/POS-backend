const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware/auth");

// Get All Products
router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM products", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Get one product
router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM products WHERE product_id = ${req.params.id}`,
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

// Create new products
router.post("/", middleware, (req, res) => {
  if (req.user.user_type === "admin") {
    const {
      sku,
      name,
      price,
      weight,
      descriptions,
      thumbnail,
      image,
      category,
      create_date,
      stock,
    } = req.body;
    try {
      con.query(
        `INSERT INTO products (sku,name,price,weight,descriptions,thumbnail,image,category,create_date,stock) VALUES ("${sku}","${name}","${price}","${weight}","${descriptions}","${thumbnail}","${image}","${category}","${create_date}","${stock}")`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  } else {
    res.send("You are too weak/ Too much chest hair");
  }
});

// Delete one Products
router.delete("/:id", middleware, (req, res) => {
  if (req.user.user_type === "admin") {
    try {
      con.query(
        `DELETE FROM products WHERE product_id = ${req.params.id}`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  } else {
    res.send("You are too weak/ Too much chest hair");
  }
});

// Edit Users by ID
router.put("/:id", middleware, (req, res) => {
  if (req.user.user_type === "admin") {
    const {
      sku,
      name,
      price,
      weight,
      descriptions,
      thumbnail,
      image,
      category,
      create_date,
      stock,
    } = req.body;
    try {
      con.query(
        `UPDATE products SET sku = "${sku}", name = "${name}", price = "${price}", weight = "${weight}", descriptions = "${descriptions}",thumbnail = "${thumbnail}",image ="${image}", category = "${category}", create_date = "${create_date}", stock ="${stock}" WHERE product_id = "${req.params.id}" `,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("You are too weak/ Too much chest hair");
  }
});

module.exports = router;
