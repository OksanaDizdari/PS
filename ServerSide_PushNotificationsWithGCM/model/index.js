/**
 * Created by Beatriz and Oksana on 26/03/2015.
 */

var pg = require('pg');
var fs = require('fs');
var conString = fs.readFileSync("config.properties").toString();

var Client = require("./clients");
var User = require("./users");

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

module.exports.pg = pg;
module.exports.conString = conString;
module.exports.Client = Client;
module.exports.User = User;
//module.exports.device = Device;