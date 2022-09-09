import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import {createQueryWhereFromObject} from './tools/helper.js';
import {todoDemoData} from './data/data.js';

const app = express();
const port = 3000;

let todos = todoDemoData;

app.use(express.json());
app.use(cors());

const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "todo",
    port: 3306,
});

app.get('/current-time', (req, res) => {
    let date = new Date();
    res.send(`${date.getHours()}:${date.getMinutes()}`);
});

app.get('/todos', async (req, res) => {
    let baseQuery = 'SELECT * FROM task';
    let result;

    if (Object.keys(req.query).length > 0) {
        let queryArray = createQueryWhereFromObject(req.query);

        baseQuery += ' ' + queryArray[0];

        [result] = await connection.execute(baseQuery, queryArray[1]);
    } else {
        [result] = await connection.execute(baseQuery);
    }

    res.send(result);
});

app.put('/todos', (req, res) => {
    todos = req.body;
    res.send(todos);
});

app.post('/sum/:number1/:number2', (req, res) => {
    let n1 = Number(req.params.number1);
    let n2 = Number(req.params.number2);

    if (typeof n1 !== 'number' || isNaN(n1) || typeof n2 !== 'number' || isNaN(n2)) {
        res.status(400);
        res.send(`Parameter can't be converted to number`);

        return;
    }

    res.send(`The sum of ${n1} and ${n2} is ${n1 + n2}`);
});

const server = app.listen(port, () => {
    console.log(`Start listen at http://localhost:${port}`);
});

const shutdownHandler = () => {
    console.log('closing all connections...');
    server.close(() => {
        connection.destroy();
        console.log('shutting down...');
        process.exit();
    });
};
process.on('SIGINT', shutdownHandler);
process.on('SIGTERM', shutdownHandler);
