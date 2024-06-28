const express = require('express');
const path = require('path');
const _ = require('lodash');
const ejs = require('ejs');

const app = express();
const port = 9000;

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

app.get('/', (req, res) => {
  const userInput = req.query.userInput || '';
  const isVulnerableVersion = versionCondition(ejsVersion);
  res.render('index', { title: 'Wanderlust Travel Agency', message: 'Welcome to Wanderlust Travel Agency', apiKey: FAKE_API_KEY, userInput: userInput, env: process.env, isVulnerableVersion });
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
