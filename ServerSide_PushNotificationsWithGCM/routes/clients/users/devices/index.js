/**
 * Created by beatr_000 on 27/03/2015.
 */
var express = require('express');
var db = require("./../../../../model");

var router = express.Router();

module.exports = function(app) {

    //PUT RTPushNotif/api/v1/clients/:clientName/users/:id/devices
    router.post("/:clientName/users/:id/devices", function(req, res){
        //verificar login ou enviar pass
        db.Device.insertDevice(req.params.id,req.body.deviceID, req.params.clientName, function(err)
        {
            if(err){
                console.log("Error inserting an device!! " + err);
                res.status(500).type('text/html').send("SERVER ERROR");
            }
            else res.redirect("/users");
        });
    });

    //DELETE RTPushNotif/api/v1/clients/:clientName/users/:id/devices
    router.delete("/:clientName/users/:id/devices", function(req, res){
        //verificar login ou enviar pass
        db.Device.deleteDevice(req.body.deviceID, function(err)
        {
            if(err){
                console.log("Error deleting a device !! " + err);
                res.status(500).type('text/html').send("SERVER ERROR");
            }
            else res.redirect("/users");
        });
    });

    app.use("/RTPushNotif/clients", router);
}