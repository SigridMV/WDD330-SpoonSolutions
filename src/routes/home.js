const express = require("express");
const router = express.Router();
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const key_api = process.env.API_KEY;

router.get("/", async (req, res) => {
  try {
    
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/random?number=3&apiKey=${key_api}`
    );
    const randomRecipes = response.data.recipes;

    
    const recipeCardsHTML = randomRecipes.map(recipe => `
      <div class="recipe-card">
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}" />
        <ul class="ingredients-list">
          ${recipe.extendedIngredients.map(ingredient => `
            <li>${ingredient.original}</li>
          `).join('')}
        </ul>
      </div>
    `).join('');

    
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>SpoonSolutions</title>
          <meta
            name="description"
            content="Explore delicious cooking recipes. Find recipes for all tastes, from main courses to irresistible desserts. Dare to cook and delight your loved ones!"
          />
          <meta name="keywords" content="recipes, cooking, food, dishes, desserts" />
          <meta name="author" content="Sigrid Müller" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
          <link rel="stylesheet" href="/public/css/style.css" />
        </head>
        <body>
          <nav>
            <div class="container">
              <ul class="menu">
                <li class="logo"><img src="/public/img/logo1.png" alt="logo" /></li>
                <li class="menu-item"><a href="/home">Home</a></li>
                <li class="menu-item"><a href="https://spoonacular.com/food-api" target="_blank">Api</a></li>
                <li class="menu-item"><a href="https://github.com/SigridMV" target="_blank">Contact</a></li>
              </ul>
            </div>
          </nav>

          <section class="search-recipes">
            <div class="container">
              <h1>Recipe Finder</h1>
              <form class="search-form" id="searchForm" method="POST" action="/search">
                <input type="text" id="query" name="query" placeholder="search recipe..." />
                <button type="submit">Search</button>
              </form>
            </div>
          </section>

          <section class="random-recipes">
            <div class="container" id="recipeCards">
              <h1>Some inspiration 😊</h1>
              <div class="recipe-cards">
                ${recipeCardsHTML}
              </div>
            </div>
          </section>

          <footer>
            <div class="container">
              <ul class="social-icons">
                <li>
                  <a href="https://www.facebook.com/" target="_blank"><i class="fa-brands fa-facebook"></i></a>
                </li>
                <li>
                  <a href="https://twitter.com/" target="_blank"><i class="fa-brands fa-twitter"></i></a>
                </li>
                <li>
                  <a href="https://www.instagram.com/" target="_blank"><i class="fa-brands fa-instagram"></i></a>
                </li>
              </ul>
            </div>
          </footer>
        </body>
      </html>
    `);

  } catch (error) {
    console.error("Error fetching random recipes:", error);
    res.status(500).send("An error occurred while fetching random recipes.");
  }
});

module.exports = router;