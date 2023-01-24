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

function registerNewUser(username, password){
    const params = {
        TableName: 'users',
        Item: {  
            username,
            password,
            role: "employee"
            //add email possibly
        }
    }

    return docClient.put(params).promise();
}

module.exports = {
    retrieveUserByUsername,
    registerNewUser,
}