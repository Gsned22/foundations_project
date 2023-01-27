const express = require('express');
const router = express.Router();
const ticketDAO = require('../DAO/ticket-dao')
const JWT = require('../utility/user-jwt-util')

router.post('/tickets/submit', async (req, res) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        let payload = await JWT.verifyTokenAndReturnPayload(token);

        if (payload.role === 'employee') {
        await ticketDAO.submitTicket(req.body.amount, req.body.description, payload.username, req.body.type); 
        res.send({
            "message": "Ticket succuessfully submitted!"
        })
        }else{
            res.send({
                "message": "You do not have the appropriate role of 'employee' to access this operation"
            }) 
        }
    }catch{
        res.send({
            "message": "Invalid reimbursement ticket input"
        })
    }
})

router.patch('/tickets/process', async (req, res) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        let payload = await JWT.verifyTokenAndReturnPayload(token);

        if (payload.role === 'manager') {
            let data = await ticketDAO.retrieveTicketByID(req.body.ticket_id);
            const userItem = data.Item;
            
            if(userItem.ticket_status === 'pending'){ //checks if there are pending tickets + only allow for changing those that are pending
                    await ticketDAO.approveOrDenyTicketByTicketID(req.body.ticket_id, req.body.ticket_status);
                    res.send({
                        "message": `${req.body.ticket_status} ticket with ID: ${req.body.ticket_id}`
                    });
               
            }else{
                res.statusCode = 400;
                res.send({
                    "message": `Ticket with ID: ${req.body.ticket_id} has already been approved or denied`
                })
            }
        } 
    } catch(err) { // token verification failure
        res.statusCode = 401;
        res.send({
            "message": "You do not have the appropriate role of 'manager' to access this operation"
        })
     }
})


module.exports = router;