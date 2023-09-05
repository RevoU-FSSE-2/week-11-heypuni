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

app.use(cors({ 
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(express.json());
app.use(userroute);

// const mysqlCon = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '1234',   
//     database: 'foods'
//   });

// mysqlCon.connect((err) => {
//     if (err) throw err;

//     console.log("Mysql Successfully Connected")
// })

// app.use(bodyParser.json())

// const commonResponse = function(data, error){
//     if (error) {
//         return {
//             success: false,
//             error: error
//         }
//     }
//     return {
//         success: true,
//         data: data
//     }
// }

// // crud
// app.get('/', (req, res) => {
//     res.send('Wait! Your favorite recipe is on the way')
// })

// app.get('/recipes', (req, res) => {
//     db.query("select * from recipes", (err, result, fields) => {
//         if (err) {
//             console.log(error)
//             res.status(500).send(commonResponse(null, "An error occured while fetching recipe"))
//             res.end()
//             return
//         }
//         res.status(200).send(commonResponse(result, null))
//         res.end()
//     })
// })

// app.get('/recipes/:id', (req, res) => {
//     const recipeId = req.params.id;
  
//     db.query(
//       `
//       SELECT
//         r.id,
//         r.title,
//         GROUP_CONCAT(DISTINCT i.name SEPARATOR ', ') AS name,
//         s.step_number,
//         s.description
//       FROM
//         recipes AS r
//       LEFT JOIN
//         ingredients AS i ON r.id = i.recipe_id
//       LEFT JOIN
//         steps AS s ON r.id = s.recipe_id
//       WHERE
//         r.id = ?
//       GROUP BY
//         r.id, r.title, s.step_number, s.description
//       `,
//       [recipeId],
//       (err, results) => {
//         if (err) {
//             console.error(err)
//             res.status(500).json(commonResponse(null, "server error"))
//             res.end()
//             return
//         }

//         res.status(200).json(commonResponse(results, null))
//         res.end()
//     }) 
// });

// app.post('/recipes', (req, res) => {
//     const { title, cooking_time_seconds } = req.body;

//     db.query(
//         `
//         INSERT INTO recipes (title, cooking_time_seconds)
//         VALUES (?, ?);
//         `,
//         [title, cooking_time_seconds],
//         (err, result) => {
//             if (err) {
//                 console.error(err);
//                 res.status(500).json({ error: 'Server error' });
//             } else {
//                 res.status(200).json({ id: result.insertId });
//             }
//         }
//     );
// });

// app.delete('/recipes/:id', (request, response) => {
//     const id = request.params.id;

//     db.query("delete from foods.recipes where id = ?", id, (err, result, fields) => {
//         if (err) {
//             console.error(err)
//             response.status(500).json(commonResponse(null, "server error"))
//             response.end()
//             return
//         }

//         if (result.affectedRows == 0) {
//             response.status(404).json(commonResponse(null, "data not found"))
//             response.end()
//             return
//         }

//         response.status(200).json(commonResponse({
//             id: id
//         }, null))
//         response.end()
//     })
// })

// app.put('/recipes/:id', (request, response) => {
//     const id = request.params.id;
//     const body = request.body;

//     db.query('update foods.recipes set title = ?, cooking_time_seconds = ? where id = ?',
//     [body.type, body.amount, body.user_id, id], (err, result) => {
//         if (err) {
//             console.error(err)
//             response.status(500).json(commonResponse(null, "server error"))
//             response.end()
//             return
//         }

//         if (result.affectedRows == 0) {
//             response.status(404).json(commonResponse(null, "data not found"))
//             response.end()
//             return
//         }

//         response.status(200).json(commonResponse({
//             id: id
//         }, null))
//         response.end()
//     })
// })

app.use(authRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running on port 3000');
});