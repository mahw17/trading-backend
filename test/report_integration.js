process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

const db = require("../db/database.js");

chai.use(chaiHttp);

describe('Reports', () => {

    describe('GET /reports/kmom01', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/kmom01")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.result.should.be.true;
                    done();
                });
        });
    });

    describe('GET /reports/kmom02', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/kmom02")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.result.should.be.true;
                    done();
                });
        });
    });

    describe('POST /reports', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/reports")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.result.should.be.false;
                    done();
                });
        });
    });
});
