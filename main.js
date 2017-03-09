const express = require('express');
//const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

var app = express()
//app.use('/css', express.static('css'));
app.use(express.static('public'));
//app.use((req, res) => res.sendFile(INDEX));

app.get('', function(req,res){
 res.sendfile(__dirname + '/index.html');
}); 

var server = require('http').Server(app);
server.listen(PORT);

//app.use((req, res) => res.sendFile(INDEX)).listen(PORT, () => console.log(`Listening on ${ PORT }`));