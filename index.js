const express = require('express');
const path = require('path');
const _ = require('lodash');
const ejs = require('ejs');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = 9000;

// PostgreSQL pool setup
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Set fake environment variables
process.env.PATH = '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin';
process.env.HOME = '/root';
process.env.LANG = 'en_US.UTF-8';
process.env.LOGNAME = 'root';
process.env.USER = 'root';
process.env.SHELL = '/bin/bash';

// Fake credentials (hardcoded)
const FAKE_API_KEY = "12345-abcde-67890-fghij";
const FAKE_DB_PASSWORD = "supersecretpassword";

// Fake PII data
const fakeUsers = [
  { name: 'John Doe', email: 'john.doe@example.com', phone: '555-1234' },
  { name: 'Jane Smith', email: 'jane.smith@example.com', phone: '555-5678' }
];

// Check EJS version
const ejsVersion = ejs.VERSION;
const versionCondition = (version) => {
  const [major, minor, patch] = version.split('.').map(Number);
  if (major < 3 || (major === 3 && minor === 1 && patch < 9) || (major === 3 && minor < 1)) {
    return true;
  }
  return false;
};

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  let dbStatus = 'DB not Connected';
  let dbStatusClass = 'db-not-connected';

  try {
    const client = await pool.connect();
    console.log('Connected to the PostgreSQL database.');
    dbStatus = 'DB Connected';
    dbStatusClass = 'db-connected';
    client.release();
  } catch (err) {
    console.error('Error connecting to the PostgreSQL database:', err);
  }

  const userInput = req.query.userInput || '';
  const isVulnerableVersion = versionCondition(ejsVersion);
  res.render('index', { 
    title: 'Wanderlust Travel Agency', 
    message: 'Welcome to Wanderlust Travel Agency', 
    apiKey: FAKE_API_KEY, 
    userInput: userInput, 
    env: process.env, 
    isVulnerableVersion,
    dbStatus,
    dbStatusClass
  });
});

app.get('/users', (req, res) => {
  res.json(fakeUsers);
});

app.post('/merge', (req, res) => {
  let obj = {};
  _.merge(obj, req.body);
  res.json(obj);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
