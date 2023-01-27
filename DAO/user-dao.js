const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-2'
});

const docClient = new AWS.DynamoDB.DocumentClient();

function retrieveUserByUsername(username){
    const params = {
        TableName: 'users',
        Key: {
            username
        }
    };

    return docClient.get(params).promise();

}

function updateRoleByUsername(username, role){
    const params = {
        TableName: 'users',
        Key: {
            username
        },
        UpdateExpression: 'set #n = :value',
        ExpressionAttributeNames: {
            '#n': 'role'
        },
        ExpressionAttributeValues: {
            ':value': role
        }
    };

    return docClient.update(params).promise();

}

// function updateUserInfoByUsername(username, fullName, address, phoneNum){
//       const params = {
//         TableName: 'users',
//         Key: {
//             username
//         },
//         UpdateExpression: 'set #n = :value',
//         ExpressionAttributeNames: {
//             '#n': 'role'
//         },
//         ExpressionAttributeValues: {
//             ':value': role
//         }
//     };
//     return docClient.update(params).promise();
// }

function registerNewUser(username, password, email){
    const params = {
        TableName: 'users',
        Item: {  
            username,
            password,
            email,
            role: "employee",
        }
    }

    return docClient.put(params).promise();
}

function retrieveUserByEmail(email){
    const params = {
        TableName: 'users',
        IndexName: 'email-index',
        KeyConditionExpression: '#c = :value',
        ExpressionAttributeNames: {
            '#c': 'email'
        },
        ExpressionAttributeValues: {
            ':value': email
        }
    };
    
    return docClient.query(params).promise();
}


module.exports = {
    retrieveUserByUsername,
    registerNewUser,
    retrieveUserByEmail,
    updateRoleByUsername
}