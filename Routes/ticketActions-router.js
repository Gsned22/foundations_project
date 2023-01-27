const express = require('express');
const router = express.Router();
const ticketDAO = require('../DAO/ticket-dao')
const JWT = require('../utility/user-jwt-util')

//employee feature
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

//manager feature
router.patch('/tickets/process', async (req, res) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        let payload = await JWT.verifyTokenAndReturnPayload(token);

        if (payload.role === 'manager') {
            let data = await ticketDAO.retrieveTicketByID(req.body.ticket_id);
            const userItem = data.Item;
            
            //makes sure they are not approving their own ticket
            if(userItem.ticket_status === 'pending' && userItem.employee_username !== payload.username){ //checks if there are pending tickets + only allow for changing those that are pending
                    await ticketDAO.approveOrDenyTicketByTicketID(req.body.ticket_id, req.body.ticket_status);
                    res.send({
                        "message": `${req.body.ticket_status} ticket with ID: ${req.body.ticket_id}`
                    });
               
            }else if(userItem.employee_username === payload.username){
                res.send({
                    "message": "You can not approve or deny your own reimbursement ticket"
                })
            }else{
                res.statusCode = 400;
                res.send({
                    "message": `Ticket with ID: ${req.body.ticket_id} has already been approved or denied`
                })
            }
        } 
    } catch{ // token verification failure
        res.statusCode = 401;
        res.send({
            "message": "You do not have the appropriate role of 'manager' to access this operation"
        })
     }
})

// //test function: recieve tickets with pending status
// retrievePendingTickets().then((data) => {
//     console.log(data);
// })

// //test function: update ticket status by ticket ID
// approveOrDenyTicketByTicketID('abc123', 'approved').then(() => {
//     console.log(` succuessfully updated reimbursement request`)
// })

module.exports = router;

