/**
 * Created by Beatriz and Oksana on 28/03/2015.
 */

var db = require("./../../model");

function insertClient (clientName, password, fn,isTest){

    db.pg.connect(isTest==true? db.conStringTests: db.conString, function(err, client, done) {
        if(err) {
            console.log(err);
            done();
            return fn(err);
        }

        client.query("INSERT INTO _client (_name, _password) VALUES($1, $2)", [clientName, password],
            function(err,res)
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


function getClient (clientName, fn){
    db.pg.connect(db.conString, function(err, client, done) {
        if(err) {
            console.log(err);
            done();
            return fn(err);
        }
        client.query("SELECT _name,_password FROM _client WHERE _name=$1", [clientName],
            function(err,result)
            {
                if(err) {
                    console.log(err);
                    done();
                    return fn(err,null);
                }
                result.rows.forEach(function (elem){
                     var client ={password:elem._password, name:elem.name};
                     done();
                     return fn(null,client);
                });
                done();
                return  fn(err,null);
            }
        );
    });
}

module.exports.insertClient = insertClient;
module.exports.getClient=getClient;