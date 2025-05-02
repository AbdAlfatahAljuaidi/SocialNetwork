const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {join} = require("path")
const {Server}=require("socket.io")
const http = require("http")


const app = express();
const PORT = 5000;

// إعداد Middleware
app.use(cors());
app.use(express.json());



const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",  // البورت اللي بيشتغل عليه React
    methods: ["GET", "POST"],
  },
});



io.on('connection', (socket) => {
    console.log('a user connected with socket id',socket.id);

      socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('send_messages_to_all_users',msg)
      });
      socket.on('typing',() => {
        socket.broadcast.emit('show_typing_status')
      })
      socket.on('stop_typing',() => {
        socket.broadcast.emit('show_typing_status')
      })


    });


  server.listen(PORT, () => {
    console.log(`🚀 Express API running on http://localhost:${PORT}`);
  });

  
  
  app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'Chat.html'));
  });