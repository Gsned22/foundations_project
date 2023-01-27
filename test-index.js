const { retrieveUserByUsername, registerNewUser, retrieveUserByEmail } = require('./DAO/user-dao');
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

// viewTicketsByType('approved').then((data) => {
//     console.log(data);
// })

retrieveUserByEmail('user123@thiscompany.com').then((data) => {
    // console.log(data);
    console.log(data.Items[0].email)
    // const useme = data.username
    // console.log(useme);
})

// retrieveUserByUsername('user123').then((data) => {
//         console.log(data);
//         const userItem = data.Item;
//         console.log(userItem.email)
//     })

// retrievePendingTickets('pending').then.then((data) => {
//     console.log(data);
// })
////test splittling email logic
// const email = "gs@thiscny.com"
// const splitEmail = email.split('@')[1];
// if(splitEmail !== "thiscompany.com"){
//     console.log("true")
// }else{
// console.log(splitEmail)
// }

// app.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}`);
// });