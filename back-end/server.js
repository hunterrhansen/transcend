const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// connect to the database
mongoose.connect('mongodb://localhost:27017/Transcend', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: './front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: [
    'secretValue'
  ],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

const users = require("./users.js");
app.use("/api/users", users.routes);

const goals = require("./goals.js");
app.use("/api/goals", goals.routes);

const updates = require("./updates.js");
app.use("/api/updates", updates.routes);

app.listen(3003, () => console.log('Server listening on port 3003!'));
