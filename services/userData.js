const fs = require('fs').promises;
const userFile = "./database/users.json";

module.exports = {

    initialize : async() => {
        // Schema
        let users = {
            meta : {
                lastId : 0
            },
            users : [],
        }

        const jsonSkeleton = JSON.stringify(users);

        // 1. Check if file exists
        try {
            await fs.access(userFile, 'utf8');
        }
        catch (err) {
            // Create file with schema only if file does not exist and not on any other error
            if (err.code === 'ENOENT') {
                await fs.writeFile(userFile, jsonSkeleton, 'utf8');
                return;
            } else {
                throw err;
            }
        }

        // 2. Read file
        const userData = await fs.readFile(userFile, 'utf8');

        // 3. Check if file is empty and write schema to file if empty
        if (userData.trim().length === 0)  {
                await fs.writeFile(userFile, jsonSkeleton, 'utf8');
                return;
        }

        // 4. Parse JSON and check if JSON is valid
        let jsonData;
        try {
            jsonData = JSON.parse(userData);
        }
        catch (err) {
            throw new Error("Invalid JSON in database");
        }

        // 5. Check if the schema of the file is correct or not
        if (typeof jsonData !== 'object' || jsonData === null || 
            typeof jsonData.met !== 'object' || jsonData.meta === null || 
            typeof jsonData.meta.lastId !== 'number' || !Array.isArray(jsonData.users)
        ) throw new Error("Database schema is invalid");
    },

    getAll : async () => {
        try {
            let allUsers = await fs.readFile(userFile, 'utf8');
            allUsers = JSON.parse(allUsers).users;
            if (!allUsers) return null;
            return allUsers;
        }
        catch(error) {
            console.error('Error reading file: ', error);
            throw err;
        }
    },

    getById : async (userId) => {
        try {
            const allUsers = JSON.parse(await fs.readFile(userFile, 'utf8')).users;
            for (const user of allUsers) {
                if (userId === user.id) {
                    return user;
                }
            }
            return null;
        }
        catch (err) {
            console.error("Error reading file: ", err);
            throw err;
        }
    },

    addUser : async (user) => {
        if (!user.name || !user.age || !user.address) {
            return null;
        }
        try {
                const userData = JSON.parse(await fs.readFile(userFile, 'utf8'));
                const meta = userData.meta;
                let users = userData.users;
                user.id = ++meta.lastId;
                users.push(user);
                const updatedUserData = {meta, users};
                await fs.writeFile(userFile, JSON.stringify(updatedUserData, null, 2), 'utf8');
                return user;
        }
        catch (err){
            console.error("Error writing file: ", err);
            throw err;
        }
    },

    updateUser : async (user, userId) => {
        try {
            const userData = JSON.parse(await fs.readFile(userFile, 'utf8'));
            const users = userData.users;
            const idx = users.findIndex(usr => usr.id === userId);
            if (idx === -1) return null;
            const existing = users[idx];
            const updated = {...existing, 
                name : user.name !== undefined ? user.name : existing.name,
                age : user.age !== undefined ? user.age : existing.age,
                address : user.address !== undefined ? user.address : existing.address,
            };
            const meta = userData.meta;
            users[idx] = updated;
            await fs.writeFile(userFile, JSON.stringify({meta, users}, null, 2), 'utf8');
            return updated;
        }
        catch (err) {
            console.error("Error writing file: ", err);
            throw err;
        }
    },

    deleteUser : async (userId) => {
        try {
            const userData = JSON.parse(await fs.readFile(userFile, 'utf8'));
            const users = userData.users;
            const meta = userData.meta;
            const idx = users.findIndex(usr => usr.id === userId);
            if (idx === -1) return null;
            const deletedUser = users[idx];
            users.splice(idx, 1);
            await fs.writeFile(userFile, JSON.stringify({meta, users}, null, 2), 'utf8');
            return deletedUser;
        } 
        catch (error) {
            console.error("Error writing file: ", error);
            throw error;
        }
    },
}