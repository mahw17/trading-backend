process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

describe('Trading funcs', () => {

    describe('GET /price', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/price")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    // res.body.data.should.be.an("object");
                    // res.body.result.should.be.true;
                    done();
                });
        });
    });

    describe('GET /trade', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/trade")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("array");
                    // res.body.data.should.be.an("object");
                    // res.body.result.should.be.true;
                    done();
                });
        });
    });

    describe('POST /trade', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/trade")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.result.should.be.false;
                    done();
                });
        });
    });

    describe('POST /deposit', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/deposit")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.result.should.be.false;
                    done();
                });
        });
    });
});
