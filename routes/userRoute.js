const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


router.get('/', userController.get);

router.post('/', userController.post);

router.put('/', userController.put);

router.delete('/', (req, res) => {
    const obj = req.body;
    if (obj.name) {
        arr = arr.filter(person => person.name != obj.name);
    }
    else {
        res.status(400).json({message : "Invalid data received"});
        return;
    }
    // res.status(204).json({message: `User ${obj.name} removed successfully`});
    // The above line has a problem that is 204 status does not allow to send response body
    // So the const result = await res.json() in index.html in deleteMethod in index.html gives and error
    // this causes the execution to stop and form.reset() never runs.
    // Therefore 2 methods:
    // 1. change status to 200  (OR)
    // 2. remove result, and json from index.html and user.js respectively.
    res.status(200).json({message: `User ${obj.name} removed successfully`});
})

module.exports = router;