# PRJ-PROXY REST
Proyecto de node, como proxy
- Uso de crypto-js para desencriptar y encriptar mediante key
- Uso de express para crear el servidor
- Uso de axios para hacer las peticiones a la API
- Uso de body-parser para obtener los datos del body
- Metodo para recibir las peticiones POST, PUT, GET, DELETE Através de un método:
    post: => https://localhost:9995/api/router
    body: => {
              "api": "https://localhost:Numberport/api/namepath",
              "method": "GET",
              "params": "?key=value1&key2=value2&key=value3"
             }

             {
                "api": "https://localhost:Numberport/api/namepath",
                "method": "POST",
                "descripcion": "D1",
                "name": "N1",
                "status": true,
                "usuarioCreation": "user1",
                "id": null
             }
             {
                "id": 11,
                "descripcion": "D1",
                "name": "N2",
                "status": true,
                "id": null
                "usuarioUpdate": "user1",
                "api": "https://localhost:Numberport/api/namepath/11",
                "method": "PUT"
             }

             {
                "api": "https://localhost:Numberport/api/namepath/11",
                "method": "DELETE"
             }

    - Configuración de DockerFile para ssl usando nginx y dockerfile.
    - Configuración de DockerFile sin ssl 

Autor: Daniel Vega. 
Fecha: 27-06-2024
Fecha Modificación: 25-07-2024
