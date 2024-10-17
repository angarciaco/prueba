'use strict';
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand } = require('@aws-sdk/lib-dynamodb');

// Crea el cliente de DynamoDB
const client = new DynamoDBClient();
const dynamoDb = DynamoDBDocumentClient.from(client); // Esto convierte el cliente en uno compatible con documentos
const FONDOS_TABLE = process.env.FONDOS_TABLE;

module.exports.handler = async () => {
  const params = {
    TableName: FONDOS_TABLE
  };

  try {
    // Ejecuta el comando Scan en la tabla de DynamoDB
    const result = await dynamoDb.send(new ScanCommand(params));
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify(result.Items)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      // body: JSON.stringify({ error: error.message }) // Envia solo el mensaje de error
      body: JSON.stringify({ error: 'No se pudieron obtener los fondos' })
    };
  }
};
