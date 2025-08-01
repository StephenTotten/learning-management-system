const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 5000;
const sequelize = require('./config/db');
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
