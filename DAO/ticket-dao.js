const AWS = require('aws-sdk');
const {uuid} = require('uuidv4');

AWS.config.update({
    region: 'us-east-2'
});

const docClient = new AWS.DynamoDB.DocumentClient();

function submitTicket(amount, description, employee_username, type){
    const params = {
        TableName: 'tickets',
        Item: {
           ticket_id: uuid(),
           amount,
           description,
           employee_username,
           ticket_status: "pending",
           type
        }

    };

    return docClient.put(params).promise();
}

function retrievePendingTickets(){
    const params = {
        TableName: 'tickets',
        IndexName: 'ticket_status-index',
        KeyConditionExpression: '#c = :value',
        ExpressionAttributeNames: {
            '#c': 'ticket_status'
        },
        ExpressionAttributeValues: {
            ':value': 'pending'
        }
    };
    
    return docClient.query(params).promise();
}

function approveOrDenyTicketByTicketID(ticket_id, new_ticket_status){
    const params = {
        TableName: 'tickets',
        Key: {
            ticket_id
        },
        UpdateExpression: 'set #n = :value',
        ExpressionAttributeNames: {
            '#n': 'ticket_status'
        },
        ExpressionAttributeValues: {
            ':value': new_ticket_status
        }
    };

    return docClient.update(params).promise();
}

function viewTicketsByUsername(employee_username){
    const params = {
        TableName: 'tickets',
        IndexName: 'employee_username-index',
        KeyConditionExpression: '#c = :value',
        ExpressionAttributeNames: {
            '#c': 'employee_username'
        },
        ExpressionAttributeValues: {
            ':value': employee_username
        }
    };
    
    return docClient.query(params).promise();
}

function viewTicketsByType(type){
    const params = {
        TableName: 'tickets',
        IndexName: 'type-index',
        KeyConditionExpression: '#c = :value',
        ExpressionAttributeNames: {
            '#c': 'type'
        },
        ExpressionAttributeValues: {
            ':value': type
        }
    };
    
    return docClient.query(params).promise();
}

module.exports = {
    submitTicket,
    retrievePendingTickets,
    approveOrDenyTicketByTicketID,
    viewTicketsByUsername,
    viewTicketsByType
}