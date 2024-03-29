const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.API_KEY;

router.get('/recipe/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
        const recipe = response.data;
        res.json(recipe);
    } catch (error) {
        console.error("Error fetching recipe details:", error);
        res.status(500).send("An error occurred while fetching recipe details.");
    }
});

module.exports = router;