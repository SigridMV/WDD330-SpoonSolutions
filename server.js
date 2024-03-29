const express = require('express');
const path = require('path');
const homeRoute = require('./src/routes/home');
const searchRoute = require('./src/routes/search');
const recipeRoute = require('./src/routes/recipe');

require('dotenv').config();

const app = express();

// Middleware 
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

// Routes
app.use('/home', homeRoute);
app.use('/search', searchRoute);
app.use('/recipe', recipeRoute);

const PORT = process.env.PORT || 3000;

// Server
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});