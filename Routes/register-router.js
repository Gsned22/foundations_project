const express = require('express');
const router = express.Router();
const userDAO = require('../DAO/user-dao')



router.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const splitEmail = email.split('@')[1];
    
    try{
        const data = await userDAO.retrieveUserByUsername(username);
        const userItem = data.Item;
        
        const data2 = await userDAO.retrieveUserByEmail(email);
        const userItem2 = data2.Items[0];

        if(userItem){
            res.statusCode = 400;
            res.send({
            "message": `User with username ${username} already exists, please choose another username.`
            })
        }else if(splitEmail !== "thiscompany.com"){
            res.statusCode = 400;
            res.send({
            "message": `${email} is not a valid company email`
            })
        }else if(userItem2){
            res.statusCode = 400;
            res.send({
            "message": `User with the email: ${email} already exists.`
            })
        }else{
            await userDAO.registerNewUser(username, password, email)
            res.statusCode = 400;
            res.send({
                    "message": `Succuessfully registered account with username ${username}`
            })
        } 
     
        
    } catch(err) {
        res.statusCode = 401;
        res.send({
            "message": "Invalid registration input."
        })

    }
});


////test splittling email logic
// const email = "gs@thiscny.com"
// const splitEmail = email.split('@')[1];
// if(splitEmail !== "thiscompany.com"){
//     console.log("true")
// }else{
// console.log(splitEmail)
// }
module.exports = router;