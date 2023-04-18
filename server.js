'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const User = require('./models/user.js');
const List = require('./models/list.js');

const app = express();
app.use(cors());
app.use(express.json());

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

app.post('/user', postUser);
app.put('/user/:id', updateUser);
app.post('/list', postList);
app.get('/list/:member', getListByMember);
app.put('/list/:id', updateList);
app.delete('/list/:id', deleteList);
app.get('/products/:upc', getProductByUPC);

// API URL https://api.upcitemdb.com/prod/trial/lookup?upc={insert upc here}

async function postUser(request, response, next) {
  try {
    let email = request.body.email;
    let foundUser = await User.find({ email: email });
    if (foundUser.length) {
      response.status(200).json(foundUser);
    } else {
      let newUser = await User.create({ email: email });
      response.status(200).json(newUser);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function updateUser(request, response, next){
  try {
    let id = request.params.id;
    let data = request.body;

    let updatedUser = await User.findByIdAndUpdate(id, data);
    response.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function postList(request, response, next) {
  try {
    let data = request.body;

    let newList = await List.create(data);
    response.status(200).json(newList);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function updateList(request, response, next){
  try {
    let id = request.params.id;
    let data = request.body;

    let updatedUser = await List.findByIdAndUpdate(id, data);
    response.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function getListByMember(request, response, next) {
  try {
    let member = request.params.member;
    let foundList = await List.find({ members: member});
    response.status(200).json(foundList);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function deleteList(request, response, next){
  try {
    let id = request.params.id;
    let deletedList = await List.findByIdAndDelete(id);
    response.status(200).send('List Deleted');
  } catch (error) {
    console.log(error);
    next(error);
  }
}

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
