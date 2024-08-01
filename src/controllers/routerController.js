const axios = require('axios');
const https = require('https');

// Configurar el agente HTTPS para aceptar certificados autofirmados
const agent = new https.Agent({
  rejectUnauthorized: false // Esto desactiva la validación del certificado
});


exports.routerData = async (req, res) => {
  try {
    const { api, method, params } = req.body;
    const payload = req.body;
    delete payload.api;
    delete payload.method;
    delete payload.params;
    let response;
    let totalCount
    switch (method) {
      case 'GET':
        let queryParams = {};

        if (params) {
          // Convertir la cadena de parámetros en un objeto si es necesario
          const queryParamsString = new URLSearchParams(params);
          queryParamsString.forEach((value, key) => {
            queryParams[key] = value;
          });
        }
        response = await axios.get(api, { params: queryParams, httpsAgent: agent });
        if (response.headers && response.headers['x-total-count']) {
          // Devolver los datos de respuesta y el encabezado 'x-total-count'
          totalCount = response.headers['x-total-count'];
          res.setHeader('x-total-count', totalCount);
        }
        break;
      case 'POSTPARAMS':
        response = await axios.post(api, payload, { params: params, httpsAgent: agent });
        break;
      case 'DELETE':
        response = await axios.delete(api, { httpsAgent: agent });
        break;
      case 'PUT':
        response = await axios.put(api, payload, { httpsAgent: agent });
        break;
      default:
        response = await axios.post(api, payload, { httpsAgent: agent });
        if (response.headers && response.headers['x-total-count']) {
          // Devolver los datos de respuesta y el encabezado 'x-total-count'
          const totalCount = response.headers['x-total-count'];
          console.log('Total Count:', totalCount);
          res.setHeader('x-total-count', totalCount);
        }
        break;
    }
    // res.json({ payload });
    res.json(response.data);
  } catch (error) {
    console.error('Error al realizar la petición:', error);
    // res.status(500).json({ error: 'Error al realizar la petición' });
    // Manejo de errores
    const status = error.response ? error.response.status : 500;
    const statusText = error.response ? error.response.statusText : 'Internal Server Error';
    const data = error.response ? { error: 'Error al realizar la petición', ...error.response.data }: error.response.data;
    const headers = error.response ? error.response.headers : {};
    res.status(status).set(headers).json({
      status,
      statusText,
      ...data
    });
  }
};
