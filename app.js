const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.static("public"));


let arr = [];
let id = 1;
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

app.put('/data', (req, res) => {
    const obj = req.body;
    if (obj.name) {
        for (const person of arr) {
            if (person.name === obj.name) {
                person.name = obj.name;
                person.age = obj.age || person.age;
                person.address = obj.address || person.address;
                res.status(200).json({message: `Data updated successfully for ${person.name}`})
                break;
            }
        }
    }
    else {
        res.status(400).json({message : "Invalid data received"});
        return;
    }
})

app.delete('/data', (req, res) => {
    const obj = req.body;
    if (obj.name) {
        arr = arr.filter(person => person.name != obj.name);
    }
    else {
        res.status(400).json({message : "Invalid data received"});
        return;
    }
    res.status(200).json({message: `User ${obj.name} removed successfully`});
})

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});