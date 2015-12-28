var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var marked = require('marked');

/* GET home page. */
router.get('/', function(req, res, next) {
  getMarkdownFile('home', res, next);
});

router.get('/:page', function(req, res, next) {
  getMarkdownFile(req.params.page, res, next);
});

function getMarkdownFile(filename, res, next) {
  fs.readFile(
    path.join(__dirname, '../pages/' + filename + '.md'), 'utf8',
    function(err, markdown) {
      if (err) return next(err);
      var html = marked(markdown);
      res.render('layout', { content: html });
    }
  );
}

module.exports = router;
