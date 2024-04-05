const express = require('express');
const axios = require('axios');
const path = require('path');
const homeRoute = require('./src/routes/home');
const ejs = require('ejs');

require('dotenv').config();

const key_api = process.env.API_KEY; 



const app = express();

// Middleware 
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
app.use(express.static('src'));
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

// Routes
app.use('/home', homeRoute);

app.post('/search', async (req, res) => {
    console.log(req.body);
    const {query} = req.body;
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${key_api}`)
    const recipes = response.data.results;
    res.render('results', {recipes})
});

app.get('/recipe/:id', async (req, res) => {
    const {id} = req.params;
    const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${key_api}`)
    const recipe = response.data;
    res.render('recipe', {recipe})
});

app.get('/about', (req, res) => {
    res.render('about');
});

const PORT = process.env.PORT || 3000;

// Server
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});