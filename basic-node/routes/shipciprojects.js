var express = require('express');
var fs = require('fs');
var url = require('url');
const superagent = require('superagent');
var router = express.Router();

/* GET users listing. */
router.get('/',
  function (req, res, next) {
    var response = "{}";
    var queryData = url.parse(req.url, true).query;

    var auth_token_value = fs.readFileSync("/etc/secrets/AUTH_TOKEN_VALUE", 'utf8');

    superagent.get('https://api.shippable.com/projects?subscriptionIds=' + queryData.subid)
    .set('Authorization', 'apiToken ' + auth_token_value)
    .end((err, response) => {
      if (err) {
        console.log("api request failed");
      }
      else {

        var jsonResponse = [];

        for (var i = 0; i < response.body.length; i++) {
          jsonResponse.push({
            "repository" : response.body[i].fullName
          });
          console.log("repo:" + response.body[i].fullName);
        }

        jsonResponse = JSON.stringify(jsonResponse)
        console.log(jsonResponse);
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        res.end(jsonResponse);
      }
    });
  }
);

module.exports = router;
