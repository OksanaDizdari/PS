
var assert = require('assert');
var request = require('supertest');
var db = require("./../model");


before('clean database',function() {
    it('should delete all records', function(done) {
        _done=done;
        db.pg.connect(db.conStringTests, function(err, client, done) {
                client.query("delete FROM _device", function(err) {
                    if(err){
                        assert(false);
                        console.log(err);
                    }
                    client.query("delete FROM _user", function(err ) {
                        if(err){
                            assert(false);
                            console.log(err);
                        }
                        client.query("delete  FROM _client", function(err) {
                            if(err){
                                assert(false);
                            }
                            done();
                            _done();
                        });
                    });
                });
            });
    })});

describe('make a request to non existing page', function() {

    it('response of the request should return 404 status ', function(done) {
        var params = {
            clientName: 'bia2',
            password: 'test'
        };
        request('http://localhost:8080')
            .post('/RTPushNotif/api/v1/clients/insert')
            .send(params)
            // end handles the response
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    throw err;
                }
                assert(res.status == 404);
                done();
            });
    });
});


describe('Insert Client', function() {

    it('should add sucessefull a client and the status of response should be 200', function(done) {
        var params = {
            clientName: 'bia2',
            password: 'test',
            test:true
        };
        request('http://localhost:8080')
            .post('/RTPushNotif/api/v1/clients/regist')
            .send(params)
             // end handles the response
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    throw err;
                }
                 assert(res.status == 200);
                 done();
            });
    });
});


describe('Error inserting a user. Violates foreign key constraint', function() {

    it('status of response should be 500', function(done) {
        var params = {
            userID: 'bia2',
            password: 'test',
            test:true
        };
        request('http://localhost:8080')
            .post('/RTPushNotif/api/v1/clients/client2/users')
            .send(params)
            // end handles the response
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    throw err;
                }
                assert(res.status == 500);
                done();
            });
    });
});

describe('Should insert sucessfull a user', function() {

    it('insert client to associate with user', function(done) {
            var params = {
                clientName: 'clientS',
                password: 'test',
                test:true
            };
            request('http://localhost:8080')
                .post('/RTPushNotif/api/v1/clients/regist')
                .send(params)
                // end handles the response
                .end(function(err, res) {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    assert(res.status == 200);
                    done();
                });
    });
        it('insert user - status of response should be 500', function(done) {
        var params = {
            userID: 'oksi2',
            password: 'test',
            test:true
        };
        request('http://localhost:8080')
            .post('/RTPushNotif/api/v1/clients/clientS/users')
            .send(params)
            // end handles the response
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    throw err;
                }
                assert(res.status == 200);
                done();
            });
    });
});
