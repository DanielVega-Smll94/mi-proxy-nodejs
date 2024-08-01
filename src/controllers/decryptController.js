const decryptData = require('../utils/methods');
const axios = require('axios');

exports.decryptData = async (req, res) => {
  try {

    const url = decryptData(req.body.api)
    const payload = {
      ...req.body,
      password: decryptData(req.body.password),
    }
    
    delete payload.api
    const response = await axios.post(url, payload);
    res.json(response.data);
  } catch (error) {
    console.error('Error al desencriptar:', error);
    res.status(500).json({ error: 'Error al desencriptar los datos' });
  }
};
