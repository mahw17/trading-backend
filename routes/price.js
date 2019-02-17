var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");

// Import class object
var User = require('../src/User/User');
let user = new User();

var Trade = require('../src/Trade/Trade');
let trade = new Trade();

var Security = require('../src/Security/Security');
let security = new Security();


/* Get current trade prices. */
router.get("/", function(req, res) {
    trade.getPrices(res, req, function(msg) {
        res.json(msg);
    });
});



/* Post/add a new deposit. */
router.post("/", function(req, res) {
    security.checkToken(req, res, function() {
        user.updatePrice(req.body.email, req.body.price, function(msg) {
            res.json(msg);
        });
    });
});


module.exports = router;
