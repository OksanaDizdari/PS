/**
 * Created by Beatriz and Oksana on 27/03/2015.
 */

var express = require('express');
var db = require("./../../../model");

var router = express.Router();

module.exports = function(app) {

    router.get('/', function (req, res) {
        //res.render('user', {title: 'XXXXXXX'});
    });

    //POST RTPushNotif/clients/:clientName/users
    router.post("/:clientName/users", function(req, res){
     //verificar login ou enviar pass

        db.User.insertUser(req.body.user, req.params.clientName, req.body.devices, function(err)
        {
            if(err){
                console.log("Error inserting an user!! " + err);
                res.status(500).type('text/html').send("SERVER ERROR");
            }
            else res.redirect("/users");
        });
    });

   //DELETE RTPushNotif/clients/:clientName/users/:id
    router.delete("/:clientName/users/:id", function(req, res){

        //verificar login ou enviar pass

        db.User.deleteUser(req.params.id, req.params.clientName, function(err)
        {
            if(err){
                console.log("Error deleting an user!! " + err);
                res.status(500).type('text/html').send("SERVER ERROR");
            }
            else res.redirect("/users");
        });
    });

   // PUT RTPushNotif/clients/:clientName/users/:id
    router.put("/:clientName/users/:id", function(req, res){

        if(req.body.user == undefined && req.body.devicesID == undefined)
            return;

            //verificar login ou enviar pass

            db.User.updateUser(req.params.id, req.params.clientName, req.body.user, req.body.devicesID,
                function (err) {
                    if (err) {
                        console.log("Error updating an user!! " + err);
                        res.status(500).type('text/html').send("SERVER ERROR");
                    }
                    else res.redirect("/users");
                })

    });

    app.use("/RTPushNotif/api/v1/clients", router);
}