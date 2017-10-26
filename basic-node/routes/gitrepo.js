var express = require('express');
var fs = require('fs');
var url = require('url');
var router = express.Router();

/* GET users listing. */
router.get('/',
  function (req, res, next) {
    var queryData = url.parse(req.url, true).query;
    var html = fs.readFileSync(queryData.filepath);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
  }
);

module.exports = router;
