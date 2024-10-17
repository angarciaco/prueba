# Prueba Técnica - Gestión de Fondos

Este repositorio contiene el código para la solución de la prueba técnica de gestión de fondos, desarrollada en dos partes: una aplicación frontend con Angular y un backend implementado usando el framework Serverless para AWS. A continuación, se detalla la estructura del repositorio y los pasos necesarios para ejecutar y desplegar la solución.

## Estructura del Repositorio

- **appAngular/gestion-fondos**: Contiene la aplicación frontend desarrollada con Angular.
- **serverless-fondos**: Incluye la configuración y el código del backend basado en funciones lambda de AWS.
- **Prueba-Parte2-SQL-Query.txt**: Archivo de texto que contiene la consulta SQL correspondiente a la segunda parte de la prueba.

## Clonación del Repositorio

Para descargar el repositorio, ejecuta el siguiente comando en la terminal:

```bash
git clone https://github.com/angarciaco/prueba.git
```

## Ejecución de la Aplicación Angular

### Navegar al directorio de la aplicación

Abre una terminal y dirígete al directorio appAngular/gestion-fondos:

```bash
cd appAngular/gestion-fondos
```

### Instalar dependencias

Asegúrate de tener instaladas todas las dependencias de la aplicación:

```bash
npm install
```

### Consideraciones

Dentro del archivo *environment.ts* se encuentra la ruta del api a emplear. Poner como valor del atributo *apiUrl* el valor de la ruta correspondiente luego de obtener la URL del api que entrega AWS luego de hacer el despliegue de la Infraestructura con Serverless (Apartado "*Desplegar la infraestructura*" de esta documentación).

*En el caso del desarrollo de la prueba se configuró el valor: https://qvddtpujij.execute-api.us-east-1.amazonaws.com/dev/fondos*

Archivo:

```bash
src/environments/environment.ts
```

```bash
export const environment = {
  production: false,
  apiUrl: 'https://qvddtpujij.execute-api.us-east-1.amazonaws.com/dev/fondos'
};
```

### Iniciar la aplicación

Para ejecutar la aplicación en modo de desarrollo, ejecuta:

```bash
ng serve
```

### Visualización

Abre tu navegador en la siguiente URL para ver la aplicación en ejecución:

```bash
http://localhost:4200
```

## Despliegue de la Infraestructura Serverless

Requisitos previos
Para desplegar la infraestructura serverless en AWS, sigue estos pasos:

Configurar credenciales de AWS:

Crea un usuario en AWS IAM con los permisos adecuados, luego configura tus credenciales de acceso de AWS en el archivo credentials en la ruta *~/.aws/credentials* con el siguiente formato:

```bash
[default]
aws_access_key_id = TU_ACCESS_KEY_ID
aws_secret_access_key = TU_SECRET_ACCESS_KEY
```

### Permisos necesarios en AWS
El usuario de AWS debe tener los siguientes permisos para interactuar con los servicios:

```
AmazonAPIGatewayAdministrator
AmazonAPIGatewayInvokeFullAccess
AmazonDynamoDBFullAccess
AmazonS3FullAccess
AWSCloudFormationFullAccess
AWSLambda_FullAccess
CloudWatchLogsFullAccess
IAMFullAccess
CustomPolicySystemsManagerForServerless
```

### Creación de la Política Custom
Si se encuentra un conflicto con AWS Systems Manager, es necesario crear una política custom inline llamada *CustomPolicySystemsManagerForServerless* con el siguiente contenido, con el ajuste del resource correspondiente (arn:aws:ssm:us-east-1:533267148825:parameter/*):

```bash
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "ssm:PutParameter",
                "ssm:GetParameters",
                "ssm:GetParameter"
            ],
            "Resource": "arn:aws:ssm:us-east-1:533267148825:parameter/*"
        }
    ]
}
```

## Despliegue con Serverless Framework

Navegar al directorio de serverless:

Dirígete al directorio serverless-fondos usando la terminal:

```bash
cd serverless-fondos
```

### Desplegar la infraestructura:

Ejecuta el siguiente comando para desplegar las funciones Lambda y demás recursos en AWS:

```bash
sls deploy
```

Al terminar, verás la ruta del endpoint a emplear. Algo parecido aparecerá al terminar:

```bash
Deploying "serverless-fondos" to stage "dev" (us-east-1)

✔ Service deployed to stack serverless-fondos-dev (73s)

endpoints:
  POST - https://qvddtpujij.execute-api.us-east-1.amazonaws.com/dev/fondos
  GET - https://qvddtpujij.execute-api.us-east-1.amazonaws.com/dev/fondos/{id}
  GET - https://qvddtpujij.execute-api.us-east-1.amazonaws.com/dev/fondos
  PUT - https://qvddtpujij.execute-api.us-east-1.amazonaws.com/dev/fondos/{id}
  DELETE - https://qvddtpujij.execute-api.us-east-1.amazonaws.com/dev/fondos/{id}
functions:
  createFondo: serverless-fondos-dev-createFondo (22 MB)
  getFondo: serverless-fondos-dev-getFondo (22 MB)
  getFondos: serverless-fondos-dev-getFondos (22 MB)
  updateFondo: serverless-fondos-dev-updateFondo (22 MB)
  deleteFondo: serverless-fondos-dev-deleteFondo (22 MB)
```

## Contacto
Si tienes alguna duda o sugerencia, no dudes en contactarme.