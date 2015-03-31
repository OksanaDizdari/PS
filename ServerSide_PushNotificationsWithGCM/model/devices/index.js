/**
 * Created by Beatriz and Oksana on 28/03/2015.
 */

var db = require("./../../model");

function insertDevice(user, key, clientName, fn,isTest){

    db.pg.connect(isTest==true? db.conStringTests: db.conString, function(err, client, done) {

        if(err) {
            console.log(err);
            done();
            return fn(err);
        }

        client.query("INSERT INTO _device (_key, _user, _client) VALUES($1, $2, $3)", [key,user, clientName],
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

function deleteDevice(key,fn) {

    db.pg.connect(db.conString, function(err, client, done) {

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

module.exports.insertDevice = insertDevice;
module.exports.deleteDevice = deleteDevice;