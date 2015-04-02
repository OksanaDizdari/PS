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

        if(req.body.userID == undefined || req.body.password == undefined){
            return  res.status(400).type('text/html').send("Miss some info in body request. User identifier and client's password required");
        }

          // TODO   verificar login ou enviar pass

        db.User.insertUser(req.body.userID, req.params.clientName, req.body.devicesID, function(err)
        {
            if(err){
                console.log("Error inserting an user!! " + err);
                res.status(500).type('text/html').send("SERVER ERROR");
            }
            else res.status(200).type('text/html').send("user inserted sucessefull");
        },req.body.test);
    });

   //DELETE RTPushNotif/clients/:clientName/users/:id
    router.delete("/:clientName/users/:id", function(req, res){

        // TODO   verificar login ou enviar pass

        db.User.deleteUser(req.params.id, req.params.clientName, function(err)
        {
            if(err){
                console.log("Error deleting an user!! " + err);
                res.status(500).type('text/html').send("SERVER ERROR");
            }
            else res.status(200).type('text/html').send("user deleted sucessefull");
        },req.body.test);
    });

   // PUT RTPushNotif/clients/:clientName/users/:id
    router.put("/:clientName/users/:id", function(req, res){

        if(req.body.userID == undefined && req.body.devicesID == undefined)
            return;

             // TODO  verificar login ou enviar pass

        db.User.updateUser(req.params.id, req.params.clientName, req.body.userID, req.body.devicesID,
                function (err) {
                    if (err) {
                        console.log("Error updating an user!! " + err);
                        res.status(500).type('text/html').send("SERVER ERROR");
                    }
                    else res.status(200).type('text/html').send("user updated sucessefull");
                },req.body.test)

    });
    app.use("/RTPushNotif/api/v1/clients", router);

}