process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let User = require('../models/user');

chai.use(chaiHttp);

describe('Users', () => {
    beforeEach((done) => {
        User.remove({}, (err) => {
            done();
        });
    });
    describe('/POST register', () => {
        it('it should register an user', (done) => {
            let user = new User({
                username: "User-test",
                userTasks: [],
            });
            chai.request(server)
                .post('/users/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    done();
                });
        });
    });
    describe('/GET getUsers', () => {
        it('it should GET all users', (done) => {
            chai.request(server)
                .get('/users/getUsers')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
});

