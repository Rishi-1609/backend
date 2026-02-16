const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const dataRoute = require('./routes/dataRoute');
const userRoute = require('./routes/userRoute');
const userService = require('./services/userData');
const { exit } = require('process');
app.use('/data', dataRoute);
app.use('/user', userRoute);


async function startServer() {
    try {
        await userService.initialize();
        app.listen(PORT, () => {
        console.log(`Server is listening at http://localhost:${PORT}`);
    });}
    catch (err) {
        console.log("Error inititalizing the database: ",err);
        throw err;
        process.exit(1);
    }
}

startServer();