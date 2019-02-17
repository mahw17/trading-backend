process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

const db = require("../db/database.js");

chai.use(chaiHttp);

describe('Register', () => {

    describe('POST /register', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/register")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.result.should.be.false;
                    done();
                });
        });
    });
});
