import express, { json } from 'express';
import cors from 'cors';
const app = express();
import { config } from 'dotenv';
config();
import { connect } from 'mongoose';
import cookieParser from 'cookie-parser';
app.use(cors());
app.use(json());
app.use(cookieParser());
import userRoute from './router/user.js';
import blogRoutes from './router/blog_create.js';
import profileRoute from './router/profile.js';



const PORT = process.env.PORT;
const MONGOURI = process.env.MONGOURI;

connect(MONGOURI, {}, (err) => {
    app.listen(PORT, () => console.log(`app running on port ${PORT}`));
    if(err) throw new Error(err)
    console.log ("database connected");
});

app.get('/', (req, res) => {
    res.send("Nothing in the main route");
});

app.use('/', userRoute);
app.use('/', blogRoutes);
app.use('/', profileRoute);