/**
 * Test for class Security.
 */
"use strict";

/* global describe it */

var assert = require("assert");
const Security = require("../src/Security/Security");

describe("Crypt pwd", function() {
    it("should be OK", function() {
        let security = new Security();
        security.cryptPassword('pwd', function(hash) {
            assert.ok(hash);
        });
    });
});
