const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const {DocumentClient} = require('aws-sdk/clients/dynamodb');

function createJWT(username, role){
    return jwt.sign({
        username,
        role
    }, 'foundationProject', {
        expiresIn: '100d'
    })
}

jwt.verify = Promise.promisify(jwt.verify);

function verifyTokenAndReturnPayload(token){
    return jwt.verify(token, 'foundationProject');
}

module.exports = {
    createJWT,
    verifyTokenAndReturnPayload
}