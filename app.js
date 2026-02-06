const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.static("public"));


let arr = [];

function pushObj(name, age, address) {
    const obj = {'name' : name, 'age' : age, 'address' : address};
    arr.push(obj);
}

app.get('/data', (req, res) => {
    console.log(arr);
    res.send(arr);
});

app.post('/data', (req, res) => {
    const obj = req.body;
    if (obj.name && obj.age && obj.address) {
        pushObj(obj.name, obj.age, obj.address);
    }
    else {
        res.status(400).json({message : "Invalid data received"});
        return;
    }
    console.log(arr[arr.length-1]);
    res.json({message : 'Data received', data : req.body})
});

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});