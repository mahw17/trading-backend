const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");

// Route handlers
const index = require('./routes/index');
const deposit = require('./routes/deposit');
const login = require('./routes/login');
const price = require('./routes/price');
const register = require('./routes/register');
const trade = require('./routes/trade');


const app = express();
const port = 1380;

app.use(cors());

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Add routes
app.use('/', index);
app.use('/deposit', deposit);
app.use('/login', login);
app.use('/price', price);
app.use('/register', register);
app.use('/trade', trade);


// Start up server
const server = app.listen(port, () => console.log(`Example API listening on port ${port}!`));

// Export server
module.exports = server;
