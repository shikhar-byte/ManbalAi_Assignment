require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./db');
const Blog = require('./models/blog');
const User = require('./models/user');
const jwt = require('jsonwebtoken');

app.set('view engine','ejs');
app.set('views',path.join(__dirname , '/views'));
app.use(express.urlencoded({extended:true}))
// CONNECTING TO DATABASE
connectDB();

// Routes
const blogsRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');


app.use(blogsRoutes);
app.use(authRoutes);




app.listen(3000 ,()=>{
    console.log('Server Running at port 3000');
})