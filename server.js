const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
app.use(cors());
app.use(express.json());
const userRoute = require('./router/user');
const blogRoutes = require('./router/blog_create');


const PORT = process.env.PORT || 4040;
const MONGOURI = process.env.MONGOURI || 'mongodb+srv://samad:abdulsamad123@samad.2upqqzc.mongodb.net/blog_project?retryWrites=true&w=majority';

mongoose.connect(MONGOURI, {}, (err) => {
    app.listen(PORT, () => console.log(`app running on port ${PORT}`));
    if(err) throw new Error(err)
    console.log ("database connected");
});

app.get('/', (req, res) => {
    res.send("This is the main page");
});

app.use('/', userRoute);
app.use('/', blogRoutes);