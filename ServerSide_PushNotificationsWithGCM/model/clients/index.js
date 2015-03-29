/**
 * Created by Beatriz and Oksana on 28/03/2015.
 */

var db = require("./../../model");

function insertClient (clientName, password, fn){
    db.pg.connect(db.conString, function(err, client, done) {
        if(err) {
            console.log(err);
            done();
            return fn(err);
        }

        client.query("INSERT INTO _client (_name, _password) VALUES($1, $2)", [clientName, password],
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

module.exports.insertClient = insertClient;