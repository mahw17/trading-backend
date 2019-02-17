/**
 * A module for handling a user
 *
 * @module
 */
"use strict";

class Trade {
    /**
     * @constructor
     *
     * @param {string} folder - Folder location of sqlite-db.
     */
    constructor(folder = './db/trading.sqlite') {
        const sqlite3 = require('sqlite3').verbose();
        this.db = new sqlite3.Database(folder);

    }



    /**
     * Get prices.
     *
     * @param {string} email - The user email.
     *
     * @returns {function} A callback function.
     */
    getPrices(req, res, next) {
        this.db.get("SELECT * FROM price",
        (err, row) => {
            if (err) {
                return next({result:false,err:err});
            }
            return next(row);
        });
    }



    /**
     * Get all trading data.
     *
     * @returns {function} A callback function.
     */
    getInfo(req, res, next) {
        this.db.all("SELECT email, stock, price FROM users WHERE price > 0 AND stock > 0",
        (err, rows) => {
            if (err) {
                return next({result:false,err:err});
            }
            return next(rows);
        });
    }
}


// Export module
module.exports = Trade;
