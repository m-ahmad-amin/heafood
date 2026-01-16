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

  // Validate query params
  if (!minCalories || !maxCalories) {
    return res.status(400).json({ error: "minCalories and maxCalories are required" });
  }

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/findByNutrients?minCalories=${minCalories}&maxCalories=${maxCalories}&number=5&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Spoonacular API error:", text);
      return res.status(500).json({ error: "Error fetching from Spoonacular" });
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error("Unexpected Spoonacular response:", data);
      return res.status(500).json({ error: "Invalid response from Spoonacular" });
    }

    res.json(data);
  } catch (err) {
    console.error("Backend error:", err);
    res.status(500).json({ error: "Server error fetching recipes" });
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));