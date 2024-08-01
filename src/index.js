const app = require('./app');

const PORT = process.env.PORT || 9995;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
