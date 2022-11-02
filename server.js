const express = require('express');
const app = express ();
const server = require('http').createServer (app);
const io = require('socket.io')(server);

app.use('/', express.static('www'));

server.listen (9000, () => {
  console.log ('Listen on port 9000');
});

io.on ('connect', (socket) => {
  console.log ('Nový klient pripojený.');

  socket.on('message', (evt) => {
    //console.log(evt)
    socket.broadcast.emit('message', evt)
  })

  socket.on ('disconnect', msg => {
    console.log ('Klient odpojený.', msg);
  });
});

