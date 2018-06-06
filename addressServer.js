var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {

    fs.writeFile('demofile1.txt', 'This is my text', function (err) {
        if (err) throw err;
        console.log('wrote!');
    });

  fs.readFile('demofile1.txt', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
}).listen(8080);