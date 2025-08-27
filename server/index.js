const express = require('express');
const cors = require('cors');
require('dotenv').config();
const seedDatabase = require('./seeders/seed');

const app = express();
app.use(cors());
app.use(express.json());

// Import models to establish associations
require('./models');

// Routes
app.get('/api', (req, res) => {
  res.send('API is running');
});
app.use('/api/courses', require('./routes/courses'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
const sequelize = require('./config/db');

// Sync database and start server
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    return sequelize.sync({ force: true }); // force: true recreates tables
  })
  .then(() => {
    return seedDatabase(); // Populate with sample data
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log('Error: ' + err));
