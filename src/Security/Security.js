/**
 * A module for collecting security related methods
 *
 * @module
 */
"use strict";

class Security {

    /**
     * @constructor
     *
     */
    constructor() {
        this.jwt = require('jsonwebtoken');
    }



    /**
     * Create a new token
     *
     * @param {string} email - The user email.
     *
     * @returns {object} A callback function.
     */
     createToken(email, next) {
         const payload = { email: email };
         const secret = process.env.JWT_SECRET;
         const token = this.jwt.sign(payload, secret, { expiresIn: '12h'});

         return next(token);
     }




    /**
     * Check if token is valid
     *
     * @param {string} token - The the token sent in the header.
     *
     * @returns {object} A callback function.
     */
    checkToken(req, res, next) {

        this.jwt.verify(req.headers['x-access-token'], process.env.JWT_SECRET, function(err, decoded) {
            if (err) {
                return res.json({result:false,err:err});
            }

            // Valid token send on the request
            // callback(true);
            next(req, res);
        });
    }



    /**
     * Crypt a password
     *
     * @param {string} pwd - Password to be crypted.
     *
     * @returns {object} A callback function.
     */
    cryptPassword(pwd, next) {
        const bcrypt = require('bcrypt-nodejs');

        bcrypt.hash(pwd, null, null, function(err, hash) {
            if (err) {
                // return res.json({err});
            }

            next(hash);
        });
    }


    /**
     * Validate a crypted password
     *
     * @param {string} pwd - Decrypted.
     * @param {string} pwdCrypted - Crypted.
     *
     * @returns {object} A callback function.
     */
    checkPassword(pwd, pwdCrypted, next) {
        const bcrypt = require('bcrypt-nodejs');

        bcrypt.compare(pwd, pwdCrypted, function(err, res) {
            if (err) {
                return next(err);
            }

            return next(res);
        });
    }

}

// Export module
module.exports = Security;
