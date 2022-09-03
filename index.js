import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/current-time', (req, res) => {
    let date = new Date();
    res.send(`${date.getHours()}:${date.getMinutes()}`);
});

app.post('/sum/:number1/:number2', (req, res) => {
    let n1 = Number(req.params.number1);
    let n2 = Number(req.params.number2);

    if(typeof n1 !== 'number' || isNaN(n1) || typeof n2 !== 'number' || isNaN(n2)) {
        res.status(400);
        res.send(`Parameter can't be converted to number`);

        return;
    }

    res.send(`The sum of ${n1} and ${n2} is ${n1 + n2}`);
});

app.listen(port, () => {
    console.log(`Start listen at http://localhost:${port}`);
})
