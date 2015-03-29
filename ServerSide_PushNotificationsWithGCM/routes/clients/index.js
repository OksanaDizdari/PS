/**
 * Created by beatr_000 on 27/03/2015.
 */

var express = require('express');
var db = require("./../../model");

var router = express.Router();

module.exports = function(app) {
    router.post("/clients/regist", function(req, res){


        db.Client.insertClient(req.body.clientName, req.body.password, function(err)
        {
            if(err)
            {
                console.log("Error inserting a Client!! " + err);
                res.status(500).type('text/html').send("SERVER ERROR");
            }
            else res.redirect("/RTPushNotif");
        });
    });

    app.use("/RTPushNotif/api/v1", router);
}