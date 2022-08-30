const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');


// const mongoose = require('mongoose')
// require('dotenv').config()

const healthCheck = require("./models/health");
const User = require("./models/User");
const Proof = require("./models/Proof");
const Certificate = require("./models/Certificate");

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('Connected to DB 📦');
});

// app.post("/user", async (req, res) => {
//   const {fullName, email} = req.body;

//   if(!fullName || !email) {
//     return res.send({
//       status: "error",
//       message: "Please provide full name and email"
//     });
//   }

//   const user = await User.findOne({
//     email: email,
//   });

app.get('/health', async (req, res) => {
  const health = await healthCheck.find();
  res.send({
    status: "success",
    message: "Health check found",
    data: health,
  });
});

app.get('/get/health', async (req, res) => {
  const health = await healthCheck.find();
  res.send({
    status: "success",
    message: "Health check found",
    data: health,
  });
});

app.post('/add/user', async (req, res) => {
  const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
  });
  await user.save();
  res.send({
    status: "success",
    message: "User added successfully",
  });
});

app.get('/get/user', async (req, res) => {
  const user = await User.find();
  res.send({
    status: "success",
    message: "User found",
  });
});

app.post('/add/certificate', async (req, res) => {
  const certificate = new Certificate({
    student_name: req.body.student_name,
    student_id: req.body.student_id,
    student_email: req.body.student_email,
    course_name: req.body.course_name,
    starting_date: req.body.starting_date,
    ending_date: req.body.ending_date,
    certificate_id: req.body.certificate_id,
    certificate_url: req.body.certificate_url,
    proof_work: req.body.proof_work
  });

  await certificate.save();
  res.send({
    status: "success",
    message: "Certificate added successfully"
  });
});

app.get('get/certificate', async (req, res) => {
  const certificates = await Certificate.find();
  res.send({
    status: "success",
    message: "Certificates found",
    data: certificates,
  });
});

app.post('/add/proof', async (req, res) => {
  const proof = new Proof({
    title: req.body.title,
    description: req.body.description,
    link: req.body.link,
    date: req.body.date,
    technology: req.body.technology,
    visibility: req.body.visibility,
    user: req.body.user,
  });
  await proof.save();
  res.send({
    status: "success",
    message: "Proof added successfully",
  });
});

app.get('/get/proof', async (req, res) => {
  const proof = await Proof.find();
  res.send({
    status: "success",
    message: "Proof found",
    data: proof,
  });
});


app.get("/health", healthCheck);

app.get("/User", User);

app.post("/Certificate", Certificate);

app.post("/Proof", Proof);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} 🚀`);
});