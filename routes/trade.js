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

/* Get current trade information. */
router.get("/", function(req, res) {
    trade.getInfo(res, req, function(msg) {
        res.json(msg);
    });
});




/* Complete a trade. */
router.post("/", function(req, res) {

    security.checkToken(req, res, function() {

        // Get seller information
        user.get(req.body.email_seller, function(err, row_seller){

            // Check if user exist and no other errors
            if (err) {
                return res.json({err});
            } else if (typeof row_seller === 'undefined') {
                // Return error message if user email doesn't exists
                return res.json({
                    result:false,
                    err:"User does not exist."
                });
            }


            // Check if seller has the required Stock
            if (row_seller.stock >= req.body.amount) {


                // Get buyer information
                user.get(req.body.email_buyer, function(err, row_buyer){ // PART1 - Get buyer balance from db

                    // Check if user exist and no other errors
                    if (err) {
                        return res.json({err});
                    } else if (typeof row_buyer === 'undefined') {
                        // Return error message if user email doesn't exists
                        return res.json({
                            result:false,
                            err:"User does not exist."
                        });
                    }


                    // Check IF buyer has required balance
                    if (row_buyer.balance >= (req.body.amount * row_seller.price)) {
                        // Update balance
                        user.updateBalance(req.body.email_seller, (req.body.amount * row_seller.price), true, function(msg) {
                            user.updateBalance(req.body.email_buyer, (req.body.amount * row_seller.price), false, function(msg) {
                            });
                        });
                        // Update stock level
                        user.updateStock(req.body.email_buyer, req.body.amount, true, function(msg) {
                            user.updateStock(req.body.email_seller, req.body.amount, false, function(msg) {
                            });
                        });

                        return res.json({
                            result:true,
                            data:"Transaction completed."
                        });

                    } else {

                        return res.json({
                            result:false,
                            err:"The transaction could not be completed. Check stock and balance."
                        });
                    } // Check IF buyer has required balance
                }); // Get buyer information
            } // Check IF seller has the required Stock
        }); // Get seller information
    });

});


module.exports = router;
