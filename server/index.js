const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const PORT = 3000;
const app = express();
const server = http.createServer(app);

app.use(cors());
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:8000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('message', (message) => {
    io.emit('receiveMessage', message);
  });

  socket.on('likeMessage', (data) => {
    // This is where you would update the like count in your data store
    // For now, we'll just broadcast the updated like count
    io.emit('updateLikeCount', data);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
