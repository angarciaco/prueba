'use strict';
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, UpdateCommand } = require('@aws-sdk/lib-dynamodb');

// Crea el cliente de DynamoDB
const client = new DynamoDBClient();
const dynamoDb = DynamoDBDocumentClient.from(client); // Cliente para trabajar con JSON
const FONDOS_TABLE = process.env.FONDOS_TABLE;

module.exports.handler = async (event) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: FONDOS_TABLE,
    Key: {
      id: event.pathParameters.id
    },
    UpdateExpression: 'set nombre = :nombre, categoria = :categoria, montoMinimo = :montoMinimo',
    ExpressionAttributeValues: {
      ':nombre': data.nombre,
      ':categoria': data.categoria,
      ':montoMinimo': data.montoMinimo
    },
    ReturnValues: 'ALL_NEW' // Retorna los nuevos valores del item actualizado
  };

  try {
    // Usa el comando "Update" para actualizar el elemento en la tabla
    const result = await dynamoDb.send(new UpdateCommand(params));
    
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify(result.Attributes)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({ error: 'No se pudo actualizar el fondo' })
    };
  }
};
