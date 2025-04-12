const express = require('express')
const bcrypt = require ('bcrypt')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const {User} = require('./models/Opinion')
require("dotenv").config()
const bodyParser = require('body-parser');
const router = require('./routes/uploadRoutes'); 
const multer = require("multer");
const i18n = require('i18n');
const http = require('http').Server(app)
const io = require('socket.io')(http)
const path = require("path");


app.get('/', function(req,res){
  res.sendFile(__dirname + '/Testt.jsx');

})






io.on('connection', function(socket){
  console.log('new client connected');
  io.emit('new', 'hello from server');
});


http.listen(5173)


app.use(cors())

app.use(express.json())

app.use(express.static(path.join(__dirname, "client/build")));

// API routes هنا إذا عندك

// fallback: serve React app for any unknown route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});


app.use('/api', router);

app.use("/" , require("./routes/userRoute"))

i18n.configure({
  locales: ['en', 'ar'],
  directory: __dirname + '/locales',
  defaultLocale: 'en',
  queryParameter: 'lang', // يمكن تحديد اللغة باستخدام باراميتر في الرابط
});

app.use(i18n.init);

// إعداد المسارات
app.get('/', (req, res) => {
  res.send(req.__('hello')); // الترجمة بناءً على اللغة المختارة
});

mongoose.connect("mongodb+srv://abdalfatahaljuaidi:Mrerror2002@cluster0.b1gih.mongodb.net/SocialNetwork?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    app.listen(4000,() =>{
        console.log("Server is ready to take off");
        
    })
})
.catch((err) =>{
    console.log(err);
    

})




















