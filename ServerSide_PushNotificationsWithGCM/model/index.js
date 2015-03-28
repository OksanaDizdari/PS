/**
 * Created by Oksana on 26/03/2015.
 */

var pg = require('pg');
var fs = require('fs');
var conString = fs.readFileSync("config.properties").toString();

function Client(name, password){
    this.name=name;
    this.password=password;
    this.insertClient = function(fn){
        pg.connect(conString, function(err, client, done) {

            if(err) {
                console.log(err);
                done();
                return fn(err);
            }

            client.query("INSERT INTO _client (_name, _password) VALUES($1 $2)", [name, password],
                function(err)
                {
                    if(err) {
                        console.log(err);
                        done();
                        return fn(err);
                    }
                    done();
                    return fn(null);
                }
            );
        });
    }
}

function insertUser(fn,identifier,clientName,devices){

    pg.connect(conString, function(err,client, done) {
        if(err) {
            console.log(err);
            done();
            return fn(err);
        }

        client.query("INSERT INTO _user (_identifier, _client) VALUES($1, $2)", [identifier, clientName],
            function(err)
            {
                if(err) {
                    console.log(err);
                    done();
                    return fn(err);
                }
                done();
                return fn(null);
            }
        );

        if(devices!=undefined && devices != null){
        console.log(devices);

            for(var i =0; i<devices.length; i++) {
                console.log(devices[i]);
                client.query("INSERT INTO _device (_key,_user, _client) VALUES($1,$2,$3)", [devices[i], identifier, clientName],
                    function (err) {
                        if (err) {
                            console.log(err);
                            done();
                            return fn(err);
                        }
                        done();
                        return fn(null);
                    }
                );
            }
        }
    });
}

function deleteUser(fn,identifier,clientName){

    pg.connect(conString, function(err, client, done) {

        if(err) {
            console.log(err);
            done();
            return fn(err);
        }

        client.query("DELETE FROM _device WHERE _user=$1 and _client=$2", [identifier,clientName],
            function(err)
            {
                if(err) {
                    console.log(err);
                    done();
                    return fn(err);
                }
                done();
                return fn(null);
            }
        );

        client.query("DELETE FROM _user WHERE _identifier=$1 and _client=$2", [identifier,clientName],
            function(err)
            {
                if(err) {
                    console.log(err);
                    done();
                    return fn(err);
                }
                done();
                return fn(null);
            }
        );
    });
}


function User(identifier, client){
    this.identifier = identifier;
    this.client = client;

    this.insertUser = function(fn){
        pg.connect(conString, function(err, client, done) {


            console.log("OK... ATE AKI NADA")
            if(err) {
                console.log(err);
                done();
                return fn(err);
            }

            client.query("INSERT INTO _user (_identifier, _client) VALUES($1, $2)", [identifier, client],
                function(err)
                {
                    if(err) {
                        console.log(err);
                        done();
                        return fn(err);
                    }
                    done();
                    return fn(null);
                }
            );
        });
    }

    this.deleteUser = function(fn){
        pg.connect(conString, function(err, client, done) {

            if(err) {
                console.log(err);
                done();
                return fn(err);
            }

            client.query("DELETE FROM _device WHERE _name=$1 ", [identifier],
                function(err)
                {
                    if(err) {
                        console.log(err);
                        done();
                        return fn(err);
                    }
                    done();
                    return fn(null);
                }
            );

            client.query("DELETE FROM _user WHERE _name=$1", [identifier],
                function(err)
                {
                    if(err) {
                        console.log(err);
                        done();
                        return fn(err);
                    }
                    done();
                    return fn(null);
                }
            );
        });
    }
}

function Device(user, key){
    this.user=user;
    this.key=key;

    this.insertDevice = function(fn){
        pg.connect(conString, function(err, client, done) {

            if(err) {
                console.log(err);
                done();
                return fn(err);
            }

            client.query("INSERT INTO _device (_key, _user) VALUES($1, $2)", [user, key],
                function(err)
                {
                    if(err) {
                        console.log(err);
                        done();
                        return fn(err);
                    }
                    done();
                    return fn(null);
                }
            );
        });
    }

    this.deleteDevice = function(fn) {

        pg.connect(conString, function(err, client, done) {

            if(err) {
                console.log(err);
                done();
                return fn(err);
            }

            client.query("DELETE FROM _device WHERE _key=$1", [key],
                function(err)
                {
                    if(err) {
                        console.log(err);
                        done();
                        return fn(err);
                    }
                    done();
                    return fn(null);
                }
            );
        });
    }
}
module.exports.InsertUser=insertUser;
module.exports.DeleteUser=deleteUser;
module.exports.client = Client;
module.exports.user = User;
module.exports.device = Device;