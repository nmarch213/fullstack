const express = require('express');
require('./services/passport'); //This is so the file is ran.

const app = express();

// Routes
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
