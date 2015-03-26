/**
 * Created by Oksana on 26/03/2015.
 */

var express = require('express');
var db = require("./../../model");

var router = express.Router();

module.exports = function(app) {

    router.get('/users', function (req, res) {
        //res.render('user', {title: 'XXXXXXX'});
    });

    router.post("/user", function(req, res){
        db.user = new db.user(req.body.name).insertUser(
            function(err)
            {
                if(err) {
                    console.log("Error inserting an user!! " + err);
                    res.status(500).type('text/html').send("SERVER ERROR");
                }
                else res.redirect("/users");
            }
        );
    });

    app.use("/", router);
}