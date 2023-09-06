import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import db from './config/database.js';
import bodyParser from 'body-parser';
import SequelizeStore from 'connect-session-sequelize';
import userroute from './routes/userroute.js';
import authRoute from "./routes/authroute.js";
import recipesroute from "./routes/recipesroute.js"

dotenv.config();
const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore ({
    db: db
})

// (async () => {
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(bodyParser.json());

app.use(cors({ 
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use(express.json());
app.use(userroute);
app.use(recipesroute);
app.use(authRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running on port 3000');
});