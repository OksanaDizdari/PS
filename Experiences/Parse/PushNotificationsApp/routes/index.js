var express = require('express');
var Parse = require("parse").Parse;

var router = express.Router();

/* GET home page. */
module.exports = function(app) {
  router.get('/', function (req, res) {
    res.render('home');
  });

  router.post('/', function (req, res) {

      Parse.initialize(
          "HB9xMnZiME6rano68rwVfAlFf9oc8kFzswOGSxoY", // applicationId
          "BzNDXeVCKXbGBno2iuonN7WrtVMZgg8rU0UAZuja", // javaScriptKey
          "DEp8Yr8P9CKpG1J7tkFoM33ZUxM0tcyAOYdwZ6vS" // masterKey
      );
      var query = new Parse.Query(Parse.Installation)
          , data = {
              "alert": req.body.message
          };


      Parse.Push.send({
          where: query,
          data: data
      }, {
          success: function () {
              console.log("arguments", arguments);
          },
          error: function (error) {
              console.log("Error: " + error.code + " " + error.message);
          }
      });

    });
  app.use("/", router);
}