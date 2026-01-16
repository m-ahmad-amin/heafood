const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const API_KEY = process.env.SPOONACULAR_API_KEY;
const PORT = process.env.PORT || 3000;

app.get("/recipes", async (req, res) => {
  const { minCalories, maxCalories } = req.query;

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/findByNutrients?minCalories=${minCalories}&maxCalories=${maxCalories}&number=5&apiKey=${API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching recipes" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));