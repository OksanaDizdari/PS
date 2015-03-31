
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


describe('Insert Client,user and associate devices to user', function() {

    it('should add sucessefull a client and the status of response should be 200', function(done) {
        var params = {
            clientName: 'CLD',
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
    it('should add sucessefull a user and the status of response should be 200', function(done) {
        var params = {
            userID: 'user1',
            password: 'test',
            test:true
        };
        request('http://localhost:8080')
            .post('/RTPushNotif/api/v1/clients/CLD/users')
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
    it('should add sucessefull a device to user and the status of response should be 200', function(done) {
        var params = {
            deviceID: '234567654',
            password: 'test',
            test:true
        };
        request('http://localhost:8080')
            .post('/RTPushNotif/api/v1/clients/CLD/users/user1/devices')
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
            userID: 'user3',
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