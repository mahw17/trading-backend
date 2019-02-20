/**
 * A module for handling a user
 *
 * @module
 */
"use strict";

class User {
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
     * Get user properties.
     *
     * @param {string} email - The user email.
     *
     * @returns {function} A callback function.
     */
    get(email, next) {
        this.db.get("SELECT * FROM users WHERE email = ?",
        email,
        (err, row) => {
            return next(err, row);
        });
    }


    /**
     * Add a new user.
     *
     * @param {string} email - The user email.
     * @param {string} pwd - The user password.
     *
     * @returns {function} A callback function.
     */
    add(email, pwd, next) {
        this.db.run("INSERT INTO users (email, password) VALUES (?, ?)",
        email,
        pwd,
        (err) => {
            if (err) {
                return next({result:false,err:err});
            }
            return next({result:true,msg:"User added successfully."});
        });
    }

    /**
     * Adjust balance
     *
     * @param {string} email        - The user email.
     * @param {float} amount        - The amount to deposit.
     * @param {boolean} operator    - True = deposit, False = withdraw.
     *
     * @returns {function} A callback function.
     */
    updateBalance(email, amount, operator, next) {

        // Get current balance
        this.db.get("SELECT balance FROM users WHERE email = ?",
        email,
        (err, row) => {

                let newBalance = row.balance;

                // New balance
                if (operator) {
                    newBalance = newBalance + amount;
                } else {
                    newBalance = newBalance - amount;
                }

                // Update new balance in db
                this.db.run("UPDATE users SET balance = ? WHERE email = ?",
                newBalance,
                email,
                (err) => {
                    if (err) {
                        return next({result:false,err:err});
                    }

                    return next({result:true, msg:"Balance successfully updated."});
                });
        });
    }

    /**
     * Adjust price
     *
     * @param {string} email        - The user email.
     * @param {float} price        - The amount to deposit.
     *
     * @returns {function} A callback function.
     */
    updatePrice(email, price, next) {

        // Update new balance in db
        this.db.run("UPDATE users SET price = ? WHERE email = ?",
        price,
        email,
        (err) => {
            if (err) {
                return next({result:false,err:err});
            }

            return next({result:true, msg:"Price successfully updated."});
        });
    }

    /**
     * Adjust stock level
     *
     * @param {string} email        - The user email.
     * @param {integer} amount      - The stock level to increase/decrease.
     * @param {boolean} operator    - True = deposit, False = withdraw.
     *
     * @returns {function} A callback function.
     */
     updateStock(email, amount, operator, next) {

         // Get current balance
         this.db.get("SELECT stock FROM users WHERE email = ?",
         email,
         (err, row) => {

                 let newStock = Number(row.stock);

                 // New balance
                 if (operator) {
                     newStock = newStock + Number(amount);
                 } else {
                     newStock = newStock - Number(amount);
                 }

                 // Update new balance in db
                 this.db.run("UPDATE users SET stock = ? WHERE email = ?",
                 newStock,
                 email,
                 (err) => {
                     if (err) {
                         return next({result:false,err:err});
                     }

                     return next({result:true, msg:"Stock successfully updated."});
                 });
         });
     }

}



// Export module
module.exports = User;
