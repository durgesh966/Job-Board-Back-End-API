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
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/users', userRoutes);

app.get("/", (req, res) => {
  res.send("Hello i am Durgeh");
});

sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Serer Listening on http://localhost:${port}`.bgGreen.black);
    })
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });