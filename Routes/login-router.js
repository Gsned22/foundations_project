const express = require('express');
const router = express.Router();
const userDAO = require('../DAO/user-dao')
const JWT = require('../utility/user-jwt-util')


router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const data = await userDAO.retrieveUserByUsername(username);
    const userItem = data.Item;

    if (userItem) { 
        if (userItem.password === password) {
            const token = JWT.createJWT(userItem.username, userItem.role);

            res.send({
                "message": "Successfully logged in.",
                "token": token
            });
        } else {
            res.statusCode = 400;
            res.send({
                "message": "Invalid password."
            })
        }
    } else {
        res.statusCode = 400;
        res.send({
            "message": `User with username ${username} does not exist`
        })
    } 
});

// retrieveUserByUsername('user123').then((data) => {
//         console.log(data);
//         const userItem = data.Item;
//         console.log(userItem.email)
//     })
module.exports = router;