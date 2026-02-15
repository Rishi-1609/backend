const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

async function checkDB() {
    const fs = require('fs').promises;
    const jsonDB = "./database/users.json";
    const metaDB = "./database/userMetadata.json";

    let arr = [];
    let meta = {};

    async function initialize() {
        const jDB = await fs.readFile(jsonDB, 'utf8');
        if (jDB.trim() === "") await fs.writeFile(jsonDB, JSON.stringify(arr, null, 2), 'utf8');

        const mDB = await fs.readFile(metaDB, 'utf8');
        if (mDB.trim() === "") {
            meta.id = 0;
            meta.totalUsers = 0;
            await fs.writeFile(metaDB, JSON.stringify(meta, null, 2), 'utf8');
        }
    }

    await initialize();

};

const dataRoute = require('./routes/dataRoute');
const userRoute = require('./routes/userRoute');
app.use('/data', dataRoute);
app.use('/user', userRoute);


async function startServer() {
    await checkDB();

    app.listen(PORT, () => {
        console.log(`Server is listening at http://localhost:${PORT}`);
    });
}

startServer();