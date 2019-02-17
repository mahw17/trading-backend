var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");

// Import class object
var User = require('../src/User/User');
let user = new User();

var Security = require('../src/Security/Security');
let security = new Security();



/* Post/add a new deposit. */
router.post("/", function(req, res) {
    security.checkToken(req, res, function() {
        user.updateBalance(req.body.email, req.body.amount, true, function(msg) {
            res.json(msg);
        });
    });
});


module.exports = router;
