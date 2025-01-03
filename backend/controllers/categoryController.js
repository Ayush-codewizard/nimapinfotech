const db = require("../db");

exports.getAllCategories = (req, res) => {
  db.query("SELECT * FROM Category", (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
};

exports.createCategory = (req, res) => {
  const { CategoryName } = req.body;
  db.query(
    "INSERT INTO Category (CategoryName) VALUES (?)",
    [CategoryName],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error adding category", error: err.message });
      res.send({
        message: "Category added successfully!",
        id: result.insertId,
      });
    }
  );
};

exports.updateCategory = (req, res) => {
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
};

exports.deleteCategory = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Category WHERE CategoryId = ?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Category deleted successfully!" });
  });
};
