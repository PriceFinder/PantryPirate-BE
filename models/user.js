'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  groups: { type: Array, required: false },
  list: { type: Array, required: false },
  pantry: { type: String, required: false },
});

const UserSchema = mongoose.model('user', userSchema);

module.exports = UserSchema;

