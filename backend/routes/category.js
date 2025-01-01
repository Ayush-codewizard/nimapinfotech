const express = require("express");
const router = express.Router();
const db = require("../db.js");

// Get all categories
router.get("/", (req, res) => {
  db.query("SELECT * FROM Category", (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// Create a new category
router.post("/", (req, res) => {
  const { CategoryName } = req.body;
  try {
    db.query(
      "INSERT INTO Category (CategoryName) VALUES (?)",
      [CategoryName],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .send({ message: "Error adding category", error: err.message });
        }
        res.send({
          message: "Category added successfully!",
          id: result.insertId,
        });
      }
    );
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Update a category
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { CategoryName } = req.body;
  db.query(
    "UPDATE Category SET CategoryName = ? WHERE CategoryId = ?",
    [CategoryName, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "Category updated successfully!" });
    }
  );
});

// Delete a category
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Category WHERE CategoryId = ?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Category deleted successfully!" });
  });
});

module.exports = router;
