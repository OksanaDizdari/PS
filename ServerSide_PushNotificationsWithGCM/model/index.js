/**
 * Created by Oksana on 26/03/2015.
 */

var pg = require('pg');
var fs = require('fs');
var conString = fs.readFileSync("config.properties").toString();

function User(name){
    this.name=name;
    this.insertUser = function(fn){
        pg.connect(conString, function(err, client, done) {

            if(err) {
                console.log(err);
                done();
                return fn(err);
            }

            client.query("INSERT INTO _user (_name) VALUES($1)", [name],
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
}


module.exports.user = User;
module.exports.device = Device;