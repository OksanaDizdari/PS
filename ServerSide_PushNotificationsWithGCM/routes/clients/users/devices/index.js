/**
 * Created by beatr_000 on 27/03/2015.
 */
var express = require('express');
var db = require("./../../../../model");

var router = express.Router();

module.exports = function(app) {

    app.use("/RTPushNotif/clients/:clientName/users/:id/devices", router);
}