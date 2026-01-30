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
app.use('/api/enrollments', require('./routes/enrollments'));

const PORT = process.env.PORT || 5000;
const sequelize = require('./config/db');

function getSyncOptions() {
  return { force: process.env.DB_RESET === 'true' };
}

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');

    const syncOptions = getSyncOptions();
    if (syncOptions.force) {
      console.warn('DB_RESET=true enabled: Recreating tables (force: true) and reseeding the DB.');
    }

    await sequelize.sync(syncOptions);

    // Only seed when we've explicitly requested a reset to avoid unexpected data changes
    if (syncOptions.force) {
      await seedDatabase(); // Populate with sample data
    }

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.log('Error: ' + err);
    process.exit(1);
  }
}

// If this file is run directly, start the server. When required by tests, don't auto-start.
if (require.main === module) {
  startServer();
}

module.exports = { startServer, getSyncOptions, app };
