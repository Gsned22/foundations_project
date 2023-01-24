const { retrieveUserByUsername, registerNewUser } = require('./DAO/user-dao');
const express = require('express');
const bodyParser = require('body-parser');
const { createJWT, verifyTokenAndReturnPayload } = require('./utility/user-jwt-util');
const { submitTicket, retrievePendingTickets, approveOrDenyTicketByTicketID, viewTicketsByType} = require('./DAO/ticket-dao');
const uuid = require('uuidv4');


const PORT = 3000;
const app = express();

app.use(bodyParser.json());

// //test function: recieve tickets with pending status
// retrievePendingTickets().then((data) => {
//     console.log(data);
// })

// //test function: update ticket status by ticket ID
// approveOrDenyTicketByTicketID('abc123', 'approved').then(() => {
//     console.log(` succuessfully updated reimbursement request`)
// })

viewTicketsByType('approved').then((data) => {
    console.log(data);
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});