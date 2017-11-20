process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let Task = require('../models/task');

chai.use(chaiHttp);

describe('Tasks', () => {
    beforeEach((done) => {
        Task.remove({}, (err) => {
            done();
        });
    });
    describe('/GET getTasks', () => {
        it('it should GET all the tasks', (done) => {
            chai.request(server)
                .get('/tasks/getTasks')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
    describe('/POST addTask', () => {
        it('it should POST a task', (done) => {
            let task = {
                details: "Test-Task!"
            };
            chai.request(server)
                .post('/tasks/addTask')
                .send(task)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    done();
                });
        });
    });
});