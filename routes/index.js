var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    const data = {
        result:true,
        info: "Banana Trading API",
    };

    res.json(data);
});

module.exports = router;
