const path     = require('path'),
      fs       = require('fs'),
      mongoose = require('mongoose');

// MAKE SURE YOU CHANGE THE NAME OF YOUR DB HERE!
mongoose.connect('mongodb://127.0.0.1:27017/chopped_db', { useNewUrlParser: true });
console.log('mongoose connected?');
require('./episodes.js');