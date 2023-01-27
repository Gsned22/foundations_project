const express = require('express');
const router = express.Router();
const userDAO = require('../DAO/user-dao')
const JWT = require('../utility/user-jwt-util')

//change role feature
router.patch('/:username/role', async (req, res) =>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        let payload = await JWT.verifyTokenAndReturnPayload(token);
        
        if (payload.role === 'manager'){
            let data = await userDAO.retrieveUserByUsername(req.params.username);
            if(data.Item){
                await userDAO.updateRoleByUsername(req.params.username, req.body.role)
                res.send({
                    "message": `Successfully changed user ${req.params.username} role to ${req.body.role}`
                })
            }else{
                res.statusCode = 404;
                res.send({
                    "message": `User with username: ${req.body.username} does not exist`
                })
            }
        } 
    }catch(err){
        res.statusCode = 500;
        res.send({
            "message": err
        })
    }
    
})

module.exports = router;