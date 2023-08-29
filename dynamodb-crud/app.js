import aws from 'aws-sdk'
import crypto from 'crypto'

const dynamodb = new aws.DynamoDB()

export const createMember = async function () {
    const uuid = crypto.randomUUID()

    try {
        const params = {
            TableName: 'MemberTable',
            Item: {
                MemberID: { S: uuid },
                Name: { S: 'John Doe' }
            }
        }

        await dynamodb.putItem(params).promise()

        return {
            statusCode: 201
        }
    } catch (e) {
        console.error(e)

        return {
            statusCode: 500,
            body: e
        }
    }
}

export const getMembers = async function () {

    try {

        const members = await dynamodb.scan({
            TableName: 'MemberTable'
        }).promise()

        return {
            statusCode: 200,
            body: JSON.stringify(members)
        }
    } catch (e) {
        console.error(e)

        return {
            statusCode: 500,
            body: e
        }
    }
}