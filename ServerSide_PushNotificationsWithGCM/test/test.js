
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

describe('Make a request to non existing page', function() {

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


//**************************************************** ERRORS *******************************************************//


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


describe('Error inserting client. Miss information in request body', function() {

    it('status of response should be 400', function(done) {
        var params = {
            clientName: 'CLD2',
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
                assert(res.status == 400);
                done();
            });
    });
});


describe('Error inserting user. Miss information in request body', function() {

    it('status of response should be 400', function(done) {
        var params = {
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
                assert(res.status == 400);
                done();
            });
    });
});


//************************************* POST REQUESTS ****************************************************//


describe('Insert client,user and associate devices to user', function() {

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

    it('should update sucessefull a user and the status of response should be 200', function(done) {
        var params = {
            userID: 'user1updated',
            password: 'test',
            test:true
        };
        request('http://localhost:8080')
            .put('/RTPushNotif/api/v1/clients/CLD/users/user1')
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
    it('should delete sucessefull a user and the status of response should be 200', function(done) {
        var params = {
            password: 'test',
            test:true
        };
        request('http://localhost:8080')
            .delete('/RTPushNotif/api/v1/clients/CLD/users/user1updated')
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


