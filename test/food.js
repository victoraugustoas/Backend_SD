//During the test the env variable is set to test
process.env.NODE_ENV = 'test'

const meal = require('../src/api/meal/meal')

const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const should = chai.should()

chai.use(chaiHttp)

/*
  * Test the /GET route
  */
describe('/GET meal', () => {
    it('recupera todos os alimentos', (done) => {
        chai.request(app)
            .get('/meal')
            .set("Authorization", "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1ZDA5MmEyZGVlMDgxNDAwMTc0YjViMjYiLCJuYW1lIjoiVmljdG9yIEF1Z3VzdG8iLCJlbWFpbCI6InZpY3RvcmF1Z3VzdG9AZW1haWwuY29tIiwiaXNQcmVtaXVtIjp0cnVlLCJ1cmxJbWciOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9jZG5jbG91ZG51dmVtL2ltYWdlL3VwbG9hZC92MTU2MDM4NjczNC91c2VyX2Z4d29yZS5wbmciLCJnZW5kZXIiOmZhbHNlLCJpYXQiOjE1NjE3NDYyNTUsImV4cCI6MTU2MjAwNTQ1NX0.l7b7MD5Z1lYclAeApWRaoHAfQw0Hwr0Pu6yu_wz8_eQ")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                // res.body.length.should.be.eql(0);
                done();
            });
    });
});
