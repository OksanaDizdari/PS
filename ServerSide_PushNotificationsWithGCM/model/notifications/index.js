/**
 * Created by Oksana on 07/04/2015.
 */

var db = require("./../../model");

function saveNotification(_user, _client, _device, isTest, fn){
    db.pg.connect(isTest==true?db.conStringTests: db.conString, function(err,client,done) {
        if(err) {
            console.log(err);
            done();
            return fn(err);
        }
        client.query("INSERT INTO _notification (_user, _client, _device) VALUES($1, $2, $3)", [_user, _client, _device],
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

function markAsDelivered(_key, _client, _device, isTest, fn){
    db.pg.connect(isTest==true?db.conStringTests: db.conString, function(err,client,done) {
        if(err) {
            console.log(err);
            done();
            return fn(err);
        }
        client.query("UPDATE _notification SET _delivered VALUES($1) WHERE _key=$2 AND _client=$3 AND _device=$4", [true, _key, _client, _device],
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

module.exports.saveNotification=saveNotification;
module.exports.markAsDelivered=markAsDelivered;