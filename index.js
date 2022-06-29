const express = require('express');
const app = express();

 
app.set('port',process.env.PORT || 3000 );

//middelware 
app.use(express.json());

//Routes
app.use(require('./src/routes/articulos'));
app.use('/api/articulos',require('./src/routes/articulos'));

//Empezar mi Servidor
app.listen(app.get('port'), () => {
  console.log('Servidor en el puerto',app.get('port'));
});