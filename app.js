var mdb = require('moviedb')('7b78c105860247bcea92ad077b72e1d2');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());



app.get("/search/movie/:name", function(req, res) {

  mdb.searchMovie({
    query: req.params.name
  }, function(err, result) {
    res.json({
      'results': result
    });
    // console.log(res['results'][0]);
  });

});

app.get("/posters/movie/:name", function(req, res) {

  mdb.searchMovie({
    query: req.params.name
  }, function(err, result) {

    var id = result['results'][0]['id']
    console.log('id: ' + id)
    mdb.movieImages({
        id: id
      },
      function(err, response) {
        res.json({
          'results': response['posters']
        });
      }
    );
    // console.log(res['results'][0]);
  });

});


app.get("/posters/tv/:name", function(req, res) {

  mdb.searchTv({
    query: req.params.name
  }, function(err, result) {

    var id = result['results'][0]['id']
    console.log('id: ' + id)
    mdb.tvImages({
        id: id
      },
      function(err, response) {
        res.json({
          'results': response['posters']
        });
      }
    );
    // console.log(res['results'][0]);
  });

});



// var host = '192.168.10.141';
var host = 'localhost';
var port = 3050;
app.listen(port, host);
console.log('listening to ' + host + ':' + port + ' ...');
