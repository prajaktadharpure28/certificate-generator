const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path'); 
const mongoose = require('mongoose')

// const mongoose = require('mongoose')
// require('dotenv').config()

const healthCheck = require("./controllers/health");
const userGet = require("./models/User");
const proofPost = require("./models/Proof");
const certificatePost = require("./models/Certificate");

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('Connected to DB 📦');
});

app.get("/health", healthCheck);

app.get("/user", userGet);

app.post("/certificate", certificatePost);

app.post("/proof", proofPost);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} 🚀`);
});