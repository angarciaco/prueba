'use strict';
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');
const { v4: uuidv4 } = require('uuid'); // Importar la función para generar IDs aleatorios

// Crea el cliente de DynamoDB
const client = new DynamoDBClient();
const dynamoDb = DynamoDBDocumentClient.from(client); // Cliente para trabajar con JSON
const FONDOS_TABLE = process.env.FONDOS_TABLE;

module.exports.handler = async (event) => {
  const data = JSON.parse(event.body);

  // Genera un ID único usando uuid
  const generatedId = uuidv4();

  const params = {
    TableName: FONDOS_TABLE,
    Item: {
      id: generatedId,          // Usa el ID generado automáticamente
      nombre: data.nombre,
      categoria: data.categoria,
      montoMinimo: data.montoMinimo
    }
  };

  try {
    // Usa el comando "Put" para insertar el elemento en la tabla
    await dynamoDb.send(new PutCommand(params));
    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({ message: 'Fondo creado exitosamente', id: generatedId }) // Devuelve el ID generado en la respuesta
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({ error: 'No se pudo crear el fondo' })
    };
  }
};
