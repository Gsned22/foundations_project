const express = require('express');
const bodyParser = require('body-parser');


const loginRouter = require('./routes/login-router')
const registerRouter = require('./routes/register-router')
const ticketActionsRouter = require('./routes/ticketActions-router')
const viewTicketsRouter = require('./routes/viewTickets-router')
const changeRolesRouter = require('./routes/changeRoles-router')
const forgotCredentialsRouter = require('./routes/forgotCredentials-router')


const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use('/', loginRouter);
app.use('/', registerRouter);
app.use('/', ticketActionsRouter);
app.use('/', viewTicketsRouter);
app.use('/', changeRolesRouter);
app.use('/', forgotCredentialsRouter);


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

