// connect df w server
const dialogflow = require('dialogflow');
const { googleProjectId } = require('../config/devkey');
const config = require('../config/devkey')

const projectId = config.googleProjectId;
const sessionId = config.dialogflowSessionId;

const credentials = {
    client_email: config.clientEmail,
    private_key: config.googlePrivateKey,
}

const sessionClient = new dialogflow.SessionsClient({projectId, credentials});

const intentQuery = async(userText, userId) => {
    // connect w df api
    console.log(userId)
    const sessionPath = sessionClient.sessionPath(projectId, sessionId+userId)
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: userText,
                languageCode: config.dialogflowSessionLanguageCode
            }
        }
    }

    try {
        console.log("IN TRY BLOCK")
        const response = await sessionClient.detectIntent(request)
        return response[0].queryResult
    } catch(error) {
        return error
    }
}

module.exports = {
    intentQuery
}