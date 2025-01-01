const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all products with pagination
router.get("/", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const offset = (page - 1) * pageSize;

  db.query(
    `SELECT Product.ProductId, Product.ProductName, Category.CategoryName, Product.CategoryId 
     FROM Product 
     JOIN Category ON Product.CategoryId = Category.CategoryId 
     LIMIT ? OFFSET ?`,
    [pageSize, offset],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.send(results);
    }
  );
});

// Create a new product
router.post("/", (req, res) => {
  const { ProductName, CategoryId } = req.body;
  db.query(
    "INSERT INTO Product (ProductName, CategoryId) VALUES (?, ?)",
    [ProductName, CategoryId],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "Product added successfully!", id: result.insertId });
    }
  );
});

// Update a product
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { ProductName, CategoryId } = req.body;
  db.query(
    "UPDATE Product SET ProductName = ?, CategoryId = ? WHERE ProductId = ?",
    [ProductName, CategoryId, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "Product updated successfully!" });
    }
  );
});

// Delete a product
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Product WHERE ProductId = ?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Product deleted successfully!" });
  });
});

module.exports = router;
