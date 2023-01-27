const express = require('express');
const router = express.Router();
const userDAO = require('../DAO/user-dao')


// forgot username
router.get('/forgot/username', async (req, res) => {
    
    try {
        const email = req.body.email;
        const data = await userDAO.retrieveUserByEmail(email);
        const userItem = data.Items[0];

        if (userItem) {
                res.send({
                "message": `The username associated with the email ${email} is: ${userItem.username}`
            })
        } else{
            res.send({
                "message": `There is no username associated with the email ${email}`
            }) 
        }

    } catch(err) {
        res.statusCode = 400;
        res.send({
            "message": "Error."
        })
     }
});

//forgot password
router.get('/forgot/password', async (req, res) => {
    
    try {
        const email = req.body.email;
        const data = await userDAO.retrieveUserByEmail(email);
        const userItem = data.Items[0];

        if (userItem) {
                res.send({
                "message": `An email has been sent to ${email} with instructions on how to reset your password`
            })
        } else{
            res.send({
                "message": `There is no user associated with the email ${email}`
            }) 
        }

    } catch(err) {
        res.statusCode = 400;
        res.send({
            "message": "Error."
        })
     }
});



module.exports = router;