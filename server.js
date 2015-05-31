var express = require('express');
var app = express();

app.use(express.static('.tmp'));
app.use(express.static('app'));
app.use(express.static('dist'));

// app.use('/', function(req, res) {
//   // res.sendFile(__dirname + '/dist/index.html');
// });

// hll

app.use('/login', function(req, res) {
  res.json('logined');
});

app.listen(9000);

