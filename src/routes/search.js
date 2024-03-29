const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.API_KEY;

router.post('/search', async (req, res) => {
    try {
        const { query } = req.body;
        const params = new URLSearchParams({ query, apiKey: API_KEY });
        const response = await axios.post(`https://api.spoonacular.com/recipes/complexSearch`, params.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const data = response.data;
        const recipes = data.results;
        res.json(recipes);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).send("An error occurred while fetching recipes.");
    }
});

module.exports = router;