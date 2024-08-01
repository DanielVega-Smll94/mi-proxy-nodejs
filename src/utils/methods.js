const CryptoJS = require('crypto-js');
const { secretKey } = require('../utils/encryptionUtil');

const decryptData = (encryptedData) => {
    try {

        const key = CryptoJS.enc.Hex.parse(secretKey);
        const iv = CryptoJS.enc.Hex.parse(encryptedData.substr(0, 32));
        const encrypted = encryptedData.substr(32);
        const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error('Error al desencriptar:', error);
        return null;
    }
};

module.exports = decryptData;
