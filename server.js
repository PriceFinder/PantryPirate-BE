'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

// *** BRING IN MONGOOSE ***
const mongoose = require('mongoose');
// const { request } = require('http');

// *** PER MONGOOSE DOCS PLUG AND PLAY CODE ****
mongoose.connect(process.env.DB_URL);

//mongoose status
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});


app.get('/products/:upc', getProductByUPC);

// API URL https://api.upcitemdb.com/prod/trial/lookup?upc={insert upc here}

async function getProductByUPC(request, response, next) {
  try {
    let url = `https://api.upcitemdb.com/prod/trial/lookup?upc=${request.params.upc}`;
    let product = await axios.get(url);
    response.status(200).json(product.data);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

// ENDPOINTS
app.get('/' , (request, response) => {
  response.send('Hello World');
});

app.get('*', (request, response) => {
  response.status(404).send('Not Available');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

