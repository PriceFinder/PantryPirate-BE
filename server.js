'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;


app.get('/' , (request, response) => {
  response.send('Hello World');
});

app.get('*', (request, response) => {
  response.status(404).send('Not Available');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

