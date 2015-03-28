/**
 * Created by beatr_000 on 27/03/2015.
 */

var express = require('express');
var db = require("./../model");

var router = express.Router();

module.exports = function(app) {

    router.get('/', function (req, res) {
         res.render('index', {});
    });


  app.use("/RTPushNotif", router);
}