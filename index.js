const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User'); //Have to place before passport to instantiate userSchema
require('./services/passport'); //This is so the file is ran.

mongoose.connect(keys.mongoURI);

const app = express();

// Routes
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
