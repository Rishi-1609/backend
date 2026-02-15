const userServices = require("../services/userData");

module.exports = {
    get: async (req, res) => {
        const users = await userServices.getAll();
        if (!users) {
            res.json([]);
            return;
        }
        res.send(users);
        console.log(users); 
    },

    post: async (req, res) => {
        const success = await userServices.addUser(req.body);
        if (success) {
            res.status(201).json("User created");
            return;
        }
        res.status(400).json("Invalid details submitted");
    },

    put : async (req, res) => {
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
    },
};