const fs = require('fs').promises;
const userFile = "./database/users.json";
const metadata = "./database/userMetadata.json";

module.exports = {
    getAll : async () => {
        try {
            let allUsers = await fs.readFile(userFile, 'utf8');
            allUsers = JSON.parse(allUsers);
            return allUsers;
        }
        catch(error) {
            console.error('Error reading file: ', error);
        }
    },

    addUser : async (user) => {
        try {
                if (user.name && user.age && user.address) {
                    let meta = JSON.parse(await fs.readFile(metadata, 'utf8'));
                    let userDetails = await fs.readFile(userFile, 'utf8');
                    userDetails = JSON.parse(userDetails);
                    user.id = meta.id + 1;
                    ++meta.id;
                    ++meta.totalUsers;
                    console.log(meta);
                    userDetails.push(user);
                    await fs.writeFile(metadata, JSON.stringify(meta, null, 2), 'utf8');
                    await fs.writeFile(userFile, JSON.stringify(userDetails, null, 2), 'utf8');
                    return true;
                }
                return false;
        }
        catch (err){
            console.error("Error writing file: ", err);
            return false;
        }
    },
}