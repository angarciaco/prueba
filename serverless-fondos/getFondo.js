'use strict';
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand } = require('@aws-sdk/lib-dynamodb');

// Crea el cliente de DynamoDB
const client = new DynamoDBClient();
const dynamoDb = DynamoDBDocumentClient.from(client); // Cliente para trabajar con JSON
const FONDOS_TABLE = process.env.FONDOS_TABLE;

module.exports.handler = async (event) => {
  const params = {
    TableName: FONDOS_TABLE,
    Key: {
      id: event.pathParameters.id
    }
  };

  try {
    // Usa el comando "Get" para obtener el elemento de la tabla
    const result = await dynamoDb.send(new GetCommand(params));
    
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify(result.Item)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({ error: 'No se pudo obtener el fondo' })
    };
  }
};
