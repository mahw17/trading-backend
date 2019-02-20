var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");

// Import class object
var User = require('../src/User/User');
let user = new User();

var Security = require('../src/Security/Security');
let security = new Security();


/* Complete a trade. */
router.post("/", function(req, res) {

    security.checkToken(req, res, function() {

        // Get user information
        user.get(req.body.email, function(err, row){

            // Check if user exist and no other errors
            if (err) {
                return res.json({err});
            } else if (typeof row === 'undefined') {
                // Return error message if user email doesn't exists
                return res.json({
                    result:false,
                    err:"User does not exist."
                });
            }

            return res.json({
                result:true,
                user:row
            });
        });
    });

});


module.exports = router;
