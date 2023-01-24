const { retrieveUserByUsername, registerNewUser } = require('./DAO/user-dao');
const express = require('express');
const bodyParser = require('body-parser');
const { createJWT, verifyTokenAndReturnPayload } = require('./utility/user-jwt-util');
const { submitTicket, retrievePendingTickets, approveOrDenyTicketByTicketID, viewTicketsByUsername, viewTicketsByType } = require('./DAO/ticket-dao');
const uuid = require('uuidv4');


const PORT = 3000;
const app = express();

app.use(bodyParser.json());

//login feature
app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const data = await retrieveUserByUsername(username);
    const userItem = data.Item;

    if (userItem) { 
        if (userItem.password === password) {
            const token = createJWT(userItem.username, userItem.role);

            res.send({
                "message": "Successfully authenticated",
                "token": token //take this out later
            });
        } else {
            res.statusCode = 400;
            res.send({
                "message": "Invalid password"
            })
        }
    } else {
        res.statusCode = 400;
        res.send({
            "message": `User with username ${username} does not exist`
        })
    } 
});

//register feature
app.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    try{
        const data = await retrieveUserByUsername(username);
        const userItem = data.Item;
        
        if(userItem){
            res.statusCode = 400;
            res.send({
            "message": `User with username ${username} already exists, please choose another username.`
            })
        }else{
            await registerNewUser(username, password)
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

//employee submit ticket
//come back to make sure employee (JWT)
app.post('/ticket/submit', async (req, res) => {
    try{
        await submitTicket(req.body.amount, req.body.description, req.body.employee_username, req.body.type); //make it tokenpayload.username
        res.send({
            "message": "succuess"
        })
    }catch{
        res.send({
            "message": "error"
        })
    }
})


// manager view pending tickets
app.get('/tickets', async (req, res) => {
    
    try {
        const token = req.headers.authorization.split(' ')[1];
        let payload = await verifyTokenAndReturnPayload(token);

        if (payload.role === 'manager') {
            
            let data = await retrievePendingTickets();
            const userItem = data.Items; 
            
            if(userItem.status === 'pending'){ 
                res.send(data.Items);
            } else{
                res.send({
                "message": `There are no pending tickets`
            })}
        }

    } catch(err) { // token verification failure
        res.statusCode = 401;
        res.send({
            "message": "Please login first."
        })
     }
});

//manager approve or deny ticket feature
//same endpoint as view pending, so that they can have the information in front of them
app.patch('/tickets', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    let payload = await verifyTokenAndReturnPayload(token);
    try{

        if (payload.role === 'manager') {
            let data = await retrievePendingTickets();
            const userItem = data.Items; 
            
            if(userItem.status === 'pending'){ //checks if there are pending tickets + only allow for changing those that are pending
                await approveOrDenyTicketByTicketID(req.body.ticket_id, req.body.ticket_status);
                res.send({
                    "message": `${req.body.ticket_status} ticket number: ${req.body.ticket_id}`
                });
            }else{
                res.statusCode = 404;
                res.send({
                    "message": "There are no pending tickets"
                });
            }
        } 
    } catch(err) { // token verification failure
        res.statusCode = 401;
        res.send({
            "message": "Please login first."
        })
     }
})

//view tickets feature
app.get('/tickets/view', async (req, res) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        let payload = await verifyTokenAndReturnPayload(token);

        if (payload) {
            let data = await viewTicketsByUsername(payload.username);
            const userItem = data.Items;
            // res.send(userItem)
            
            if(req.query.type){ //checks if there is a type query
                let qData = await viewTicketsByType(req.query.type);
                res.send(qData.Items)
            }else{
                res.send(userItem)
            }
        } else{
            res.send({
                "message": " User token not found, please login first."
            })
        }
    } catch(err) { // token verification failure
        res.statusCode = 401;
        res.send({
            "message": "Please login first."
        })
     }
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

