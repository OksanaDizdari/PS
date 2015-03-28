
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

        db.InsertUser(function(err)
        {
            if(err){
                console.log("Error inserting an user!! " + err);
                res.status(500).type('text/html').send("SERVER ERROR");
            }
            else res.redirect("/users");
        },req.body.user, req.params.clientName,req.body.devices)
    });

        /* new db.user(req.body.user, req.params.clientName).insertUser(
                function(err)
               {
                    if(err){
                        console.log("Error inserting an user!! " + err);
                        res.status(500).type('text/html').send("SERVER ERROR");
                    }
                    else res.redirect("/users");
                }
           );
        });*/

   //DELETE RTPushNotif/clients/:clientName/users
    router.delete("/:clientName/users", function(req, res){

        //verificar login ou enviar pass

        db.DeleteUser(function(err)
        {
            if(err){
                console.log("Error deleting an user!! " + err);
                res.status(500).type('text/html').send("SERVER ERROR");
            }
            else res.redirect("/users");
        },req.body.user, req.params.clientName)

      /*  db.user = new db.user(req.body.user,req.params.clientName).deleteUser(
            function(err)
            {
                if(err) {
                    console.log("Error inserting an user!! " + err);
                    res.status(500).type('text/html').send("SERVER ERROR");
                }
                else res.redirect("/users");
            }
        );*/
    });


   //  AINDA NAO ESTA TESTADO
   // PUT RTPushNotif/clients/:clientName/users/:id
    router.put("/:clientName/users/:id", function(req, res){

        //verificar login ou enviar pass
        db.UpdateUser(function(err)
        {
            if(err){
                console.log("Error deleting an user!! " + err);
                res.status(500).type('text/html').send("SERVER ERROR");
            }
            else res.redirect("/users");
        },req.params.id, req.params.clientName,req.body.user,req.body.devicesID)

        /*  db.user = new db.user(req.body.user,req.params.clientName).deleteUser(
         function(err)
         {
         if(err) {
         console.log("Error inserting an user!! " + err);
         res.status(500).type('text/html').send("SERVER ERROR");
         }
         else res.redirect("/users");
         }
         );*/
    });

    app.use("/RTPushNotif/clients", router);
}