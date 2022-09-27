const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const userRoute = require('./router/user');
const blogRoutes = require('./router/blog_create');



const PORT = process.env.PORT;
const MONGOURI = process.env.MONGOURI;

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