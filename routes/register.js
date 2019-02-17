var express = require('express');
var router = express.Router();

// Import class object
var User = require('../src/User/User');
let user = new User();

var Security = require('../src/Security/Security');
let security = new Security();




/* Route for adding new user */
router.post('/', function(req, res, next) {
    security.cryptPassword(req.body.pwd, function(hash) {

        user.add(req.body.email, hash, function(msg) {
            res.json(msg);
        });
    });
});


module.exports = router;
