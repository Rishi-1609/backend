const userServices = require("../services/userData");

module.exports = {
    get: async (req, res) => {
        const users = await userServices.getAll();
        if (!users) {
            return res.json([]);
        }
        console.log(users); 
        return res.send(users);
    },

    getUser : async(req, res) => {
        try {
            const id = parseInt(req.params.userId);
            if (isNaN(id) || !isFinite(id)) {
                return res.status(400).json({message : "Invalid user ID"});
            }
            let user = await userServices.getById(id);
            if (user) {
                console.log(user);
                return res.json(user);
            }
            return res.status(404).json({message : "User not found"});
        }
        catch (err) {
            console.log("Error in getUser: ", err);
            return res.status(500).json({message : "Internal server error"});
        }
    },

    post: async (req, res) => {
        const createdUser = await userServices.addUser(req.body);
        if (createdUser) {
            return res.status(201).json({ message: "User created", user: createdUser });
        }
        res.status(400).json("Invalid details submitted");
    },

    put : async (req, res) => {
        try {
            const id = parseInt(req.params.userId);
            if (isNaN(id) || !isFinite(id)) {
                return res.status(400).json({message : "Invalid user ID"});
            }
            const update = await userServices.updateUser(req.body, id);
            if (update) {
                return res.status(200).json(update);
            }
            return res.status(404).json({message : "User not found"});
        }
        catch (err) {
            console.error("Error in updateUser(): ", err);
            return res.status(500).json({message : "Internal server error"});
        }
    },

    delete : async (req, res) => {
        try {
            const id = parseInt(req.params.userId);
            if (isNaN(id) || !isFinite(id)) {
                return res.status(400).json({message : "Invalid user ID"});
            }
            const deletedUser = await userServices.deleteUser(id);
            if (deletedUser) {
                return res.status(204).end();
            }
            return res.status(404).json({message : "User not found"});
        }
        catch (err) {
            console.error("Error in deleteUser(): ", err);
            return res.status(500).json({message : "Internal server error"});
        }
    },
};