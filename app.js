const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const cors = require("cors");
app.use(
    cors({
        origin : "https://html-js-frontend.vercel.app/",
    })
)

app.use(express.json());
// app.use(express.static("public"));

app.get('/', (req, res) => {
       res.send("Welcome to my first deployed backend");
})

const dataRoute = require('./routes/dataRoute');
const userRoute = require('./routes/userRoute');
const userService = require('./services/userData');
const { exit } = require('process');
app.use('/data', dataRoute);
app.use('/users', userRoute);


async function startServer() {
    try {
        await userService.initialize();
        app.listen(PORT, () => {
        console.log(`Server is listening at https://express-backend-zwcm.onrender.com/`);
    });}
    catch (err) {
        console.log("Error inititalizing the database: ",err);
        throw err;
        process.exit(1);
    }
}

startServer();
