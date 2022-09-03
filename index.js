import express from 'express';

const app = express();
const port = 3000;

app.get('/current-time', (req, res) => {
    let date = new Date();
    res.send(`${date.getHours()}:${date.getMinutes()}`);
});

app.listen(port, () => {
    console.log(`Start listen at http://localhost:${port}`);
})
