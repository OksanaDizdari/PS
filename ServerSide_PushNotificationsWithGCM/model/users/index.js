/**
 * Created by Beatriz and Oksana on 28/03/2015.
 */

var db = require("./../../model");

function insertUser(identifier, clientName, devices, fn){

    db.pg.connect(db.conString, function(err,client, done) {
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
            for(var i =0; i<devices.length; i++) {
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

function deleteUser(identifier,clientName, fn){

    db.pg.connect(db.conString, function(err, client, done) {

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

function updateUser(identifier,clientName,newIdentifier,newDevices, fn){
    db.pg.connect(db.conString, function(err, client, done) {

        if(err) {
            console.log(err);
            done();
            return fn(err);
        }
        if(clientName != undefined){
            client.query("UPDATE _user SET _identifier=$1 WHERE _identifier=$2 and _client=$3", [newIdentifier,identifier,clientName],
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
        }
     /*   if(newDevices != undefined) {
            for (var i = 0; i < newDevices.length; ++i) {
                client.query("UPDATE FROM _device SET key=$1 WHERE _user=$2 and _client=$2", [identifier, clientName],
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
        }*/
    });

}

module.exports.insertUser=insertUser;
module.exports.deleteUser=deleteUser;
module.exports.updateUser=updateUser;