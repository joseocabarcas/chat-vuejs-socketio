var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var querystring = require('querystring');

var datas = [];

io.on('connection', function (socket) {
  socket.on('new message', function (data) {
    let values = querystring.stringify(data);
    datas.push(values);
    io.emit('get message',data);
  });
});

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

app.listen(5000);

/*
Guide to react

http://www.thegreatcodeadventure.com/real-time-react-with-socket-io-building-a-pair-programming-app/
https://medium.com/dailyjs/combining-react-with-socket-io-for-real-time-goodness-d26168429a34

*/