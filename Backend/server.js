const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require("multer");
const i18n = require('i18n');
const { join } = require('path');
const { Server } = require('socket.io');
const http = require('http');
const Message = require('./models/Messages')

// استدعاء الموديلات والروترات
const { User } = require('./models/Opinion');
const uploadRouter = require('./routes/uploadRoutes');
const userRouter = require("./routes/userRoute");

require("dotenv").config();

const app = express();
const PORT = 4000;

// إعداد HTTP و Socket.io على نفس الخادم
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // غيّر حسب عنوان React
    methods: ["GET", "POST"],
  },
});

// إعداد middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// الترجمة
i18n.configure({
  locales: ['en', 'ar'],
  directory: __dirname + '/locales',
  defaultLocale: 'en',
  queryParameter: 'lang',
});
app.use(i18n.init);

// المسارات
app.use('/api', uploadRouter);
app.use("/", userRouter);

app.get('/', (req, res) => {
  res.send(req.__('hello'));
});

// Socket.io أحداث
io.on('connection', (socket) => {
  console.log('🟢 User connected:', socket.id);

  socket.on('chat message', async (msgData) => {
    console.log('📨 Message:', msgData);
    
    try {
      const newMessage = new Message(msgData);
      await newMessage.save();
      io.emit('send_messages_to_all_users', msgData);
    } catch (err) {
      console.error("❌ Error saving message:", err);
    }
  });

  socket.on('typing', () => {
    socket.broadcast.emit('show_typing_status');
  });

  socket.on('stop_typing', () => {
    socket.broadcast.emit('clear_typing_status');
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
  });
});

// الاتصال بقاعدة البيانات وتشغيل السيرفر
mongoose.connect(process.env.MONGO_URL || "mongodb+srv://abdalfatahaljuaidi:Mrerror2002@cluster0.b1gih.mongodb.net/SocialNetwork?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
