const express = require("express");
const app = express();
require("colors");
require("dotenv").config({ path: ".env" });
const bodyParser = require('body-parser');
const port = process.env.PORT || 9000;

const sequelize = require('./config/database');

const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);
app.use('/applications', applicationRoutes);
app.use('/users', userRoutes);

app.get("/", (req, res) => {
  res.send("Hello i am Durgeh");
});

app.listen(port, () => {
  console.log(`Serer Listening on http://localhost:${port}`.bgGreen.black);
});

sequelize.sync()
  .then(() => {
    console.log('Database connected'.bgCyan.black);
  })
  .catch(err => {
    console.error(`Unable to connect to the database:, ${err}`.bgRed.black);
  });