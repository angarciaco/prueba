'use strict';
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, DeleteCommand } = require('@aws-sdk/lib-dynamodb');

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
    // Usa el comando "Delete" para eliminar el elemento de la tabla
    await dynamoDb.send(new DeleteCommand(params));
    
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({ message: 'Fondo eliminado exitosamente' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({ error: 'No se pudo eliminar el fondo' })
    };
  }
};
