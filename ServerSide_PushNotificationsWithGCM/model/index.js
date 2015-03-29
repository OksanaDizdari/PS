/**
 * Created by Beatriz and Oksana on 26/03/2015.
 */

var pg = require('pg');
var fs = require('fs');
var conString = fs.readFileSync("config.properties").toString();

var Client = require("./clients");
var User = require("./users");
var Device = require("./devices");

module.exports.pg = pg;
module.exports.conString = conString;
module.exports.Client = Client;
module.exports.User = User;
module.exports.Device = Device;